//-Path: 'Vite-Extra-React-SSR-TypeScript/src/entry-client.tsx'
import './index.css';
import App from './App';
import env from './secure/env';
import { StrictMode } from 'react';
import Providers from './providers/Providers';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const basename = env.BASE;
const currentPath = window.location.pathname;

// ตรวจสอบและ redirect ถ้า URL ไม่ตรงกับ basename
if (basename !== '/' && !currentPath.startsWith(basename)) {
    // ข้าม redirect สำหรับ assets และ socket.io
    const isAsset = /\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/i.test(
        currentPath,
    );

    if (!isAsset) {
        // สร้าง URL ใหม่พร้อม basename
        let newPath = basename;

        // ถ้าไม่ใช่ root path ให้ต่อท้าย path ปัจจุบัน
        if (currentPath !== '/') newPath += currentPath.replace(/^\//, '');

        // เก็บ query string และ hash
        newPath += window.location.search + window.location.hash;

        // Redirect
        console.log(`Redirecting from ${currentPath} to ${newPath}`);
        window.location.href = newPath;
    }
} else {
    // ลบ basename ออกจาก path สำหรับส่งให้ Router
    let pathForRouter = currentPath;
    if (basename !== '/' && currentPath.startsWith(basename))
        pathForRouter = currentPath.replace(basename, '') || '/';

    // อัพเดท URL ใน browser history ถ้าจำเป็น
    if (pathForRouter !== currentPath && pathForRouter !== '/')
        window.history.replaceState(
            null,
            '',
            pathForRouter + window.location.search + window.location.hash,
        );

    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        <StrictMode>
            <Providers>
                <BrowserRouter basename={basename}>
                    <App />
                </BrowserRouter>
            </Providers>
        </StrictMode>,
    );
}
