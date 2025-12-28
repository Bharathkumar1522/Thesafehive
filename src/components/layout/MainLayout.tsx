import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function MainLayout({ isLoggedIn, onLogout }: MainLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50">
            <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />
            <main className="flex-grow">
                <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
