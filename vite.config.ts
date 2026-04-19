// -Path: "vite-extra-react-ssr-ts/vite.config.ts"
import path from 'path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import tsconfig from './tsconfig.app.json';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate Vite aliases from tsconfig paths
 */
const getAliases = () => {
    const alias: Record<string, string> = {};
    const paths = tsconfig.compilerOptions.paths || {};

    Object.entries(paths).forEach(([key, value]) => {
        const cleanKey = key.replace(/\/\*$/, '');
        const cleanPath = (Array.isArray(value) ? value[0] : value).replace(/\/\*$/, '');
        alias[cleanKey] = path.resolve(__dirname, cleanPath);
    });

    return alias;
};

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: getAliases(),
    },
    plugins: [react(), tailwindcss()],
});
