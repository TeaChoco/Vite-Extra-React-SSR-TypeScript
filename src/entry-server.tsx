//-Path: "vite-extra-react-ssr-ts/src/entry-server.tsx"
import App from './App';
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import Providers from './components/layout/Providers';
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server';

import i18n from './i18n/i18n';

export function render(url: string, lang: string = 'en', options?: RenderToPipeableStreamOptions) {
    i18n.changeLanguage(lang);
    return renderToPipeableStream(
        <StrictMode>
            <Providers>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </Providers>
        </StrictMode>,
        options,
    );
}
