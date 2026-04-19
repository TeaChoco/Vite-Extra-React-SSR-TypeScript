//-Path: "vite-extra-react-ssr-ts/scripts/postbuild.mjs"
import fs from "node:fs";

// Move index.html to server dir so Vercel CDN won't serve it statically
// The serverless function reads it from dist/server/ instead
const source = "./dist/client/index.html";
const destination = "./dist/server/index.html";

fs.copyFileSync(source, destination);
fs.unlinkSync(source);
console.log("✅ Moved index.html → dist/server/index.html");
