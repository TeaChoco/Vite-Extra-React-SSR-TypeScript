//-Path: "vite-extra-react-ssr-ts/src/entry-client.tsx"
import './index.css';
import App from './App';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Providers from './components/layout/Providers';

hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
        <Providers>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Providers>
    </StrictMode>,
);
