//-Path: "Vite-Extra-React-SSR-TypeScript/prerender.ts"
import fs from 'node:fs';
import path from 'node:path';
import { Writable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const { render, getHeadForRoute } = await import('./dist/server/entry-server.js');

const routesToPrerender = fs
    .readdirSync(toAbsolute('src/pages'))
    .map((file) => {
        const name = file.replace(/\.tsx$/, '').toLowerCase();
        return name === 'home' ? '/' : `/${name}`;
    });

function renderToString(renderResult: { pipe: (destination: Writable) => void }): Promise<string> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        const writable = new Writable({
            write(chunk, encoding, callback) {
                chunks.push(Buffer.from(chunk, encoding as BufferEncoding));
                callback();
            },
        });
        writable.on('finish', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        writable.on('error', reject);
        renderResult.pipe(writable);
    });
}

(async () => {
    for (const url of routesToPrerender) {
        const head = getHeadForRoute(url);
        const renderResult = render(url, 'en');

        const appHtml = await renderToString(renderResult);

        const html = template
            .replace(`<!--app-head-->`, head ?? '')
            .replace(`<!--app-html-->`, appHtml);

        const filePath = `dist/client${url === '/' ? '/index' : url}.html`;

        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(toAbsolute(filePath), html);
        console.log('pre-rendered:', filePath);
    }
})();
