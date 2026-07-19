//-Path: "Vite-Extra-React-SSR-TypeScript/prerender.ts"
import fs from 'node:fs';
import path from 'node:path';
import { Writable } from 'node:stream';
import { fileURLToPath } from 'node:url';

type EntryServer = typeof import('./src/entry-server.tsx');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const devModule: EntryServer = await import('./dist/server/entry-server.js');

const routesToPrerender = fs.readdirSync(toAbsolute('src/pages')).map((file) => {
    const name = file.replace(/\.tsx$/, '').toLowerCase();
    return name === 'home' ? '/' : `/${name}`;
});

/** รอให้ render stream เสร็จแล้ว return HTML string */
function streamToString(pipe: (dest: Writable) => void): Promise<string> {
    const chunks: Buffer[] = [];
    return new Promise((resolve, reject) => {
        const writable = new Writable({
            write(chunk, _encoding, callback) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                callback();
            },
        });
        writable.on('finish', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        writable.on('error', reject);
        pipe(writable);
    });
}

(async () => {
    for (const url of routesToPrerender) {
        const appHtml = await new Promise<string>((resolve, reject) => {
            const { pipe, abort } = devModule.render(url, 'en', {
                onShellReady() {
                    streamToString(pipe).then(resolve).catch(reject);
                },
                onShellError(error) {
                    console.error(`Shell error on ${url}:`, error);
                    reject(error);
                },
                onError(error) {
                    console.error(`Render error on ${url}:`, error);
                    abort();
                    reject(error);
                },
            });
        });

        const head = devModule.getHeadForRoute(url);
        const html = template
            .replace('<!--app-head-->', head ?? '')
            .replace('<!--app-html-->', appHtml);

        const filePath = `dist/client${url === '/' ? '/index' : url}.html`;
        const dir = path.dirname(toAbsolute(filePath));

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(toAbsolute(filePath), html);
        console.log('pre-rendered:', filePath);
    }
})();
