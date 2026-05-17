//-Path: "vite-extra-react-ssr-ts/server.ts"
import os from 'node:os';
import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs/promises';
import { ViteDevServer } from 'vite';
import compression from 'compression';
import { Transform } from 'node:stream';
import tailwindcss from '@tailwindcss/vite';

type EntryServer = typeof import('./src/entry-server.tsx');

dotenv.config();

const time = Date.now();

// Constants
const ABORT_DELAY = 10000;
const base = process.env.VITE_CLIENT_BASE || '/';
const port: number = Number(process.env.VITE_CLIENT_PORT || 5173);
const host: string = String(process.env.VITE_CLIENT_HOST || '127.0.0.1');
const isProduction: boolean = process.env.VITE_MODE === 'production';

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/server/index.html', 'utf-8') : '';

async function createServer() {
    // Create http server
    const app = express();

    app.use(compression());

    // Add Vite or respective production middlewares
    let vite: ViteDevServer;
    if (!isProduction) {
        const { createServer } = await import('vite');
        vite = await createServer({
            base,
            appType: 'custom',
            plugins: [tailwindcss()],
            server: { middlewareMode: true },
        });
        app.use(vite.middlewares);
    } else {
        const sirv = (await import('sirv')).default;
        app.use(base, sirv('./dist/client', { extensions: [] }));
    }

    // Serve HTML
    app.use('*all', async (req, res) => {
        // ข้าม request ที่ไม่ใช่ HTML page
        const url = req.originalUrl;

        // ตรวจสอบว่าเป็น request สำหรับไฟล์หรือไม่
        const isAsset = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map|json)$/i.test(
            url,
        );
        const isWellKnown = url.includes('/.well-known/');
        const isSocket = url.includes('/socket.io');
        const isApi = url.includes('/api/');

        // ถ้าเป็น asset, well-known, socket, หรือ api => ไม่ต้อง render React
        if (isAsset || isWellKnown || isSocket || isApi)
            // ส่ง 404 หรือ next
            return res.status(404).end();

        // ถ้าเป็น root และไม่มี basename ให้ redirect
        if (base !== '/' && (url === '/' || url === '')) return res.redirect(302, base);
        try {
            let template: string;
            let didError: boolean = false;
            let render: EntryServer['render'];
            let getHeadForRoute: EntryServer['getHeadForRoute'];
            const requestUrl = req.originalUrl.replace(base, '').replace(/^\/?/, '/');

            if (!isProduction) {
                // Always read fresh template in development
                template = await fs.readFile('./index.html', 'utf-8');
                template = await vite.transformIndexHtml(requestUrl, template);
                const devModule = await vite.ssrLoadModule('/src/entry-server.tsx');
                render = devModule.render;
                getHeadForRoute = devModule.getHeadForRoute;
            } else {
                template = templateHtml;
                const prodModule = await import('./dist/server/entry-server.js');
                render = prodModule.render;
                getHeadForRoute = prodModule.getHeadForRoute;
            }

            const cookies = req.headers.cookie || '';
            const themeMatch = cookies.match(/theme=([^;]+)/);
            const theme = themeMatch ? themeMatch[1] : 'dark';

            if (theme === 'dark')
                template = template.replace('<html lang="en">', '<html lang="en" class="dark">');

            const langMatch = cookies.match(/i18next=([^;]+)/);
            const lang = langMatch ? langMatch[1] : 'en';

            const head = getHeadForRoute(url);
            template = template.replace('<!--app-head-->', head);

            const { pipe, abort } = render(url, lang, {
                async onShellError(error) {
                    res.status(500);
                    console.error('Shell Error:', error);
                    res.set({ 'Content-Type': 'text/html' });
                    // ไม่ต้องส่ง error กลับไป client ถ้าเป็น Navigate error
                    if (error instanceof Error && error?.message?.includes('<Navigate>')) {
                        // ส่งหน้า index กลับไปให้ client จัดการ navigation เอง
                        const html = template.replace('<!--app-html-->', '');
                        res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
                        return;
                    }

                    if (!(error instanceof Error)) return;
                    try {
                        let html = await fs.readFile('./error.html', 'utf-8');
                        html = html.replace(
                            '<body></body>',
                            `<body><h1>Something went wrong</h1><pre style="white-space: pre-wrap;">${error.stack || error.message || error}</pre></body>`,
                        );
                        res.send(html);
                    } catch {
                        res.send(
                            `<h1>Something went wrong</h1><pre style="white-space: pre-wrap;">${error.stack || error.message || error}</pre>`,
                        );
                    }
                },
                onShellReady() {
                    res.status(didError ? 500 : 200);
                    res.set({ 'Content-Type': 'text/html' });

                    const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

                    const transformStream = new Transform({
                        transform(chunk, encoding, callback) {
                            res.write(chunk, encoding);
                            callback();
                        },
                    });
                    transformStream.on('finish', () => {
                        res.write(htmlEnd);
                        res.end();
                    });

                    res.write(htmlStart);
                    pipe(transformStream);
                },
                onError(error) {
                    didError = true;
                    console.error('render on Error: ', error);
                },
            });
            setTimeout(() => abort(), ABORT_DELAY);
        } catch (error: unknown) {
            if (!(error instanceof Error)) throw new Error('Unknown error', { cause: error });
            if (!isProduction && vite) vite.ssrFixStacktrace(error);
            console.error('Error stack: ', error.stack);
            try {
                let html = await fs.readFile('./error.html', 'utf-8');
                html = html.replace(
                    '<body></body>',
                    `<body><h1>Server Error</h1><pre style="white-space: pre-wrap;">${error.stack || error.message || error}</pre></body>`,
                );
                res.status(500).set({ 'Content-Type': 'text/html' }).end(html);
            } catch {
                res.status(500).end(error.stack);
            }
        }
    });

    return app;
}

// Start http server
createServer()
    .then((server) => {
        server.listen(port, host, () => {
            const addresses: string[] = [];
            const interfaces = os.networkInterfaces();
            Object.values(interfaces).forEach((ifaces) =>
                ifaces?.forEach((iface) => {
                    if (iface.family === 'IPv4' && !iface.internal) addresses.push(iface.address);
                }),
            );
            console.log(
                `\n    ${chalk.green('VITE')} ${chalk.hex('#FF69B4')('Extra React TypeScript SSR')} by ${chalk.bold(chalk.blue('TeaChoco'))} ${chalk.gray(`ready in ${Date.now() - time} ms`)}\n`,
            );

            console.log(
                `    ${chalk.green('➜')}  Local:    ${chalk.cyan(`http://${host}:${port}${base}`)}`,
            );
            addresses.forEach((addr) =>
                console.log(
                    `    ${chalk.green('➜')}  Network:  ${chalk.cyan(`http://${addr}:${port}${base}`)}`,
                ),
            );
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
