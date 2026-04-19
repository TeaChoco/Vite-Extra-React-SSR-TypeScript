//-Path: "vite-extra-react-ssr-ts/scripts/prerender.mjs"
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, "..", p);

const template = fs.readFileSync(toAbsolute("dist/client/index.html"), "utf-8");
const { render, getHeadForRoute } = await import("../dist/server/entry-server.js");

// ระบุ Route ทั้งหมดที่ต้องการให้มี SEO (SSG)
const routesToPrerender = ["/", "/about", "/socket"];

(async () => {
    console.log("🚀 Starting SSG Prerender...");

    for (const url of routesToPrerender) {
        let html = template;
        const head = getHeadForRoute(url);
        html = html.replace("<!--app-head-->", head);

        // จำลองการดึง HTML จาก renderToPipeableStream (แปลง Stream เป็น String)
        const appHtml = await new Promise((resolve, reject) => {
            let result = "";
            const { pipe, abort } = render(url, "en", {
                onAllReady: async () => {
                    const { Writable } = await import("node:stream");
                    const writable = new Writable({
                        write(chunk, encoding, callback) {
                            result += chunk.toString();
                            callback();
                        },
                    });
                    writable.on("finish", () => resolve(result));
                    pipe(writable);
                },
                onError(err) {
                    reject(err);
                },
            });
            setTimeout(() => abort(), 10000);
        });

        const fullHtml = html.replace("<!--app-html-->", appHtml);

        // กำหนดที่เก็บไฟล์ เช่น /about -> dist/client/about/index.html
        const fileName = url === "/" ? "index.html" : `${url.slice(1)}/index.html`;
        const filePath = toAbsolute(`dist/client/${fileName}`);
        
        // สร้างโฟลเดอร์ถ้ายังไม่มี
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        
        fs.writeFileSync(filePath, fullHtml);
        console.log(`✅ Prerendered: ${url} -> ${fileName}`);
    }

    // สร้าง 404.html สำหรับ GitHub Pages เพื่อรองรับ client-side routing
    fs.copyFileSync(toAbsolute("dist/client/index.html"), toAbsolute("dist/client/404.html"));
    console.log("✅ Created 404.html fallback");

    console.log("✨ SSG completion successful!");
    process.exit(0);
})();
