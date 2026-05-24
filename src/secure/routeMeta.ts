// -Path: 'Vite-Extra-React-SSR-TypeScript/src/data/routeMeta.ts"

export interface RouteMeta {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    image: string;
}

export type RouteMetaMap = { default: RouteMeta } & Record<string, Partial<RouteMeta>>;

export const routeMetaMap: RouteMetaMap = {
    default: {
        title: 'Vite Extra React SSR TypeScript',
        description:
            'Production-ready Vite + React SSR template with TypeScript, Tailwind CSS, i18next, Zustand, and Socket.io',
        keywords: [
            'TeaChoco',
            'Template',
            'Vite',
            'React',
            'SSR',
            'TypeScript',
            'Tailwind CSS',
            'i18next',
            'Zustand',
            'Socket.io',
        ],
        author: 'Vite Extra React SSR',
        image: '/vite-extra-react-ssr-ts.png',
    },
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

/**
 * Find meta for a route, fallback to '/'
 */
export const getRouteMeta = (pathname: string): RouteMeta =>
    ({ ...routeMetaMap.default, ...routeMetaMap[pathname] }) as RouteMeta;
