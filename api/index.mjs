//-Path: "vite-extra-react-ssr-ts/api/index.mjs"
import fs from "node:fs";
import path from "node:path";
import express from "express";
import { Transform } from "node:stream";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (/** @type {string} */ filePath) => path.resolve(__dirname, filePath);

const template = fs.readFileSync(resolve("../dist/server/index.html"), "utf-8");
const { render, getHeadForRoute } = await import(resolve("../dist/server/entry-server.js"));

const app = express();

app.use("*all", async (req, res) => {
    try {
        const url = req.originalUrl;
        const cookies = req.headers.cookie || "";
        const themeMatch = cookies.match(/theme=([^;]+)/);
        const theme = themeMatch ? themeMatch[1] : "dark";

        let html = template;
        if (theme === "dark")
            html = html.replace('<html lang="en">', '<html lang="en" class="dark">');

        const langMatch = cookies.match(/i18next=([^;]+)/);
        const lang = langMatch ? langMatch[1] : "en";

        const head = getHeadForRoute(url);
        html = html.replace("<!--app-head-->", head);

        let didError = false;
        const { pipe, abort } = render(url, lang, {
            onShellError(error) {
                res.status(500);
                console.error(error);
                res.set({ "Content-Type": "text/html" });
                res.send(`<h1>SSR Error</h1><pre>${error.stack || error}</pre>`);
            },
            onShellReady() {
                res.status(didError ? 500 : 200);
                res.set({ "Content-Type": "text/html" });

                const [htmlStart, htmlEnd] = html.split("<!--app-html-->");

                const transformStream = new Transform({
                    transform(chunk, encoding, callback) {
                        res.write(chunk, encoding);
                        callback();
                    },
                });
                transformStream.on("finish", () => {
                    res.write(htmlEnd);
                    res.end();
                });

                res.write(htmlStart);
                pipe(transformStream);
            },
            onError(error) {
                didError = true;
                console.error(error);
            },
        });

        setTimeout(() => abort(), 10000);
    } catch (error) {
        console.error(error.stack);
        res.status(500).end(error.stack);
    }
});

export default app;
