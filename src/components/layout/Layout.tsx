//-Path: "TeaChoco-Portfolio/client/src/layout/Layout.tsx"
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className='flex flex-col min-h-dvh overflow-auto'>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
