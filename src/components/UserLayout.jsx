import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar'; // We'll create this for desktop
import { useAuth } from '../context/AuthContext';

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-ivory font-sans text-obsidian">

            <div className="flex mx-auto max-w-[1400px]">
                {/* Desktop Sidebar (Left) */}
                <aside className="hidden md:block w-64 fixed h-screen top-0 left-0 border-r border-gray-100 bg-white z-20">
                    <Sidebar />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 md:ml-64 w-full min-h-screen relative p-0 pb-24 md:pb-8">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <BottomNav />
            </div>
        </div>
    );
};

export default UserLayout;
