//-Path: "vite-extra-react-ssr-ts/src/App.tsx"
import Home from './pages/Home';
import About from './pages/About';
import Socket from './pages/Socket';
import { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

function SafeNavigate({ to, replace = false }: { to: string; replace?: boolean }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // ไม่ render อะไรตอน SSR, render Navigate เฉพาะตอน client-side
    if (!isClient) return null;

    return <Navigate to={to} replace={replace} />;
}

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='socket' element={<Socket />} />
                <Route path='*' element={<SafeNavigate to='/' replace />} />
            </Route>
        </Routes>
    );
}
