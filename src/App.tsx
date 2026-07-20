//-Path: "vite-extra-react-ssr-ts/src/App.tsx"
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import Notfound from './pages/Notfound';
import About from './pages/about/About';
import Socket from './pages/socket/Socket';
import Threejs from './pages/threejs/Threejs';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='auth' element={<Auth />} />
                <Route path='about' element={<About />} />
                <Route path='socket' element={<Socket />} />
                <Route path='threejs' element={<Threejs />} />
                <Route path='*' element={<Notfound />} />
            </Route>
        </Routes>
    );
}
