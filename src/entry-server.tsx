//-Path: "Vite-Extra-React-SSR-TypeScript/src/entry-server.tsx"
import App from './App';
import i18n from './i18n';
import env from './secure/env';
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import Providers from './components/provider/Providers';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';

interface RouteMeta {
    title: string;
    description: string;
}

const routeMetaMap: Record<string, RouteMeta> = {
    '/': {
        title: 'Vite Extra React SSR TypeScript',
        description:
            'Production-ready Vite + React SSR template with TypeScript, Tailwind CSS, i18next, Zustand, and Socket.io',
    },
    '/about': {
        title: 'About — Vite Extra React SSR',
        description: 'Explore the architecture and tech stack behind this SSR template',
    },
    '/three': {
        title: 'Three.js — Vite Extra React SSR',
        description: 'Interactive 3D scene using Three.js with React Three Fiber',
    },
    '/socket': {
        title: 'Socket.io — Vite Extra React SSR',
        description: 'Real-time Socket.io integration with live player count',
    },
};

/** Generate SEO head tags based on the current route */
export function getHeadForRoute(url: string): string {
    const meta = routeMetaMap[url] || routeMetaMap['/']!;
    return [
        `<title>${meta.title}</title>`,
        `<meta name="description" content="${meta.description}" />`,
        `<meta property="og:title" content="${meta.title}" />`,
        `<meta property="og:description" content="${meta.description}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${meta.title}" />`,
        `<meta name="twitter:description" content="${meta.description}" />`,
    ].join('\n        ');
}

export function render(url: string, lang: string = 'en', options?: RenderToPipeableStreamOptions) {
    i18n.changeLanguage(lang);
    return renderToPipeableStream(
        <StrictMode>
            <Providers>
                <StaticRouter location={url} basename={env.BASE}>
                    <App />
                </StaticRouter>
            </Providers>
        </StrictMode>,
        options,
    );
}
