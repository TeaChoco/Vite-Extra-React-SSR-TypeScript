//-Path: "vite-extra-react-ssr-ts/src/App.tsx"
import Home from './pages/Home';
import About from './pages/About';
import Socket from './pages/Socket';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

export default function App() {
    return (
        <div className='flex flex-col min-h-dvh overflow-auto'>
            <Navbar />
            <main className='flex-1'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/socket' element={<Socket />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
