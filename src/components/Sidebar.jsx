import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiUsers, FiUser, FiLogOut, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path;

    const menuItems = [
        { path: '/home', label: 'Dashboard', icon: FiHome },
        { path: '/products', label: 'Investments', icon: FiShoppingBag },
        { path: '/promotion', label: 'Refer & Earn', icon: FiUsers },
        { path: '/profile', label: 'Profile', icon: FiUser },
        { path: '/support', label: 'Support', icon: FiHelpCircle },
    ];

    return (
        <div className="h-full flex flex-col justify-between p-6 bg-white">
            <div>
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                        R
                    </div>
                    <h1 className="text-xl font-bold font-heading text-obsidian tracking-tight">
                        Royal<span className="text-primary">Groww</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive(item.path)
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-charcoal hover:bg-gray-50 hover:text-obsidian'
                                }`}
                        >
                            <item.icon size={20} className={isActive(item.path) ? 'text-primary' : 'opacity-70'} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-obsidian truncate">{user?.fullName || 'User'}</p>
                        <p className="text-xs text-ash truncate">{user?.username || ''}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-charcoal hover:bg-red-50 hover:text-red-500 transition-all duration-200"
                >
                    <FiLogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
