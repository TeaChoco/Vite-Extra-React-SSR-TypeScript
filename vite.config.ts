// -Path: "vite-extra-react-ssr-ts/vite.config.ts"
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsconfig from './tsconfig.app.json';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv, type AliasOptions } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate Vite aliases from tsconfig paths
 */
const getAliases = (): AliasOptions => {
    const alias: AliasOptions = {};
    const paths = tsconfig.compilerOptions.paths || {};

    Object.entries(paths).forEach(([key, value]) => {
        const cleanKey = key.replace(/\/\*$/, '');
        const cleanPath = (Array.isArray(value) ? value[0] : value).replace(/\/\*$/, '');
        alias[cleanKey] = path.resolve(__dirname, cleanPath);
    });

    return alias;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const base = String(env.VITE_CLIENT_BASE || '/');
    const port = Number(env.VITE_CLIENT_PORT || 8000);
    const host = String(env.VITE_CLIENT_HOST || '0.0.0.0');
    const isDev = env.VITE_MODE === 'development';

    return {
        base,
        resolve: { alias: getAliases() },
        plugins: [react(), tailwindcss()],
        server: {
            port,
            host,
            strictPort: isDev ? true : undefined,
        },
    };
});
