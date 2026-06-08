import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    HiHome,
    HiUsers,
    HiCurrencyRupee,
    HiCreditCard,
    HiGift,
    HiLogout,
    HiShoppingBag,
    HiMenu,
    HiX,
    HiBell,
    HiChevronRight,
    HiShieldCheck,
    HiChatAlt2,
    HiSpeakerphone,
    HiTerminal,
} from 'react-icons/hi';


const AdminLayout = ({ children, title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: HiHome, label: 'Dashboard' },
        { path: '/admin/kyc', icon: HiShieldCheck, label: 'KYC Requests' },
        { path: '/admin/support', icon: HiChatAlt2, label: 'Support Desk' },
        { path: '/admin/notifications', icon: HiSpeakerphone, label: 'Announcements' },
        { path: '/admin/products', icon: HiShoppingBag, label: 'Products' },
        { path: '/admin/users', icon: HiUsers, label: 'Users' },
        { path: '/admin/withdrawals', icon: HiCurrencyRupee, label: 'Withdrawals' },
        { path: '/admin/bank-requests', icon: HiCreditCard, label: 'Bank Requests' },
        { path: '/admin/gift-codes', icon: HiGift, label: 'Gift Codes' },
        { path: '/admin/logs', icon: HiTerminal, label: 'System Logs' },
    ];

    // Generate breadcrumbs from current path
    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        return paths.map((path, index) => ({
            label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
            path: '/' + paths.slice(0, index + 1).join('/')
        }));
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <div className="min-h-screen bg-ivory flex">
            {/* Sidebar - Desktop */}
            <aside className={`w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col fixed h-full z-30 shadow-sm`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-charcoal">Royal Groww</h1>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-all group ${isActive
                                            ? 'bg-gold/10 text-gold font-semibold shadow-sm'
                                            : 'text-ash hover:bg-white hover:text-charcoal hover:shadow-sm'
                                            }`}
                                    >
                                        <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gold' : 'text-gray-400 group-hover:text-gold'}`} />
                                        <span className="flex-1">{item.label}</span>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile & Logout */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold">
                            {user?.fullName?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-charcoal truncate">{user?.fullName || 'Admin'}</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                        <HiLogout className="w-5 h-5 mr-3 group-hover:rotate-[-10deg] transition-transform" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`w-64 bg-white fixed h-full z-50 lg:hidden transform transition-transform duration-300 shadow-2xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                            <span className="text-white font-bold text-xl">R</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-charcoal">Royal Groww</h1>
                            <p className="text-xs text-gray-500">Admin Panel</p>
                        </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-charcoal">
                        <HiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-all ${isActive
                                            ? 'bg-gold/10 text-gold font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <HiLogout className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-white border-b border-gray-200 z-30 shadow-sm">
                <div className="flex justify-between items-center p-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <HiMenu className="w-6 h-6 text-charcoal" />
                    </button>
                    <h1 className="text-lg font-bold text-charcoal">Royal Groww</h1>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <HiBell className="w-6 h-6 text-charcoal" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-h-screen bg-ivory">
                {/* Header with Breadcrumbs */}
                <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 lg:py-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-sm mb-2">
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={crumb.path}>
                                    {index > 0 && <HiChevronRight className="w-4 h-4 text-gray-400" />}
                                    <Link
                                        to={crumb.path}
                                        className={`${index === breadcrumbs.length - 1
                                            ? 'text-gold font-medium'
                                            : 'text-gray-500 hover:text-charcoal'
                                            } transition-colors`}
                                    >
                                        {crumb.label}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </nav>

                        {/* Page Title */}
                        <h2 className="text-2xl lg:text-3xl font-bold text-charcoal">{title}</h2>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
