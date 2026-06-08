import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiUsers, FiUser } from 'react-icons/fi';

const BottomNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isActive = (path) => currentPath === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] border-t border-gray-100 z-50">
            <div className="grid grid-cols-4 gap-1 p-2 pb-safe">
                <Link 
                    to="/home" 
                    className={`flex flex-col items-center p-2 transition-all duration-300 ${
                        isActive('/home') 
                        ? 'text-gold transform -translate-y-1' 
                        : 'text-ash hover:text-gold'
                    }`}
                >
                    <FiHome size={24} className={isActive('/home') ? 'fill-gold/20' : ''} />
                    <span className="text-[10px] sm:text-xs mt-1 font-medium">Home</span>
                </Link>

                <Link 
                    to="/products" 
                    className={`flex flex-col items-center p-2 transition-all duration-300 ${
                        isActive('/products') 
                        ? 'text-gold transform -translate-y-1' 
                        : 'text-ash hover:text-gold'
                    }`}
                >
                    <FiShoppingBag size={24} className={isActive('/products') ? 'fill-gold/20' : ''} />
                    <span className="text-[10px] sm:text-xs mt-1 font-medium">Invest</span>
                </Link>

                <Link 
                    to="/promotion" 
                    className={`flex flex-col items-center p-2 transition-all duration-300 ${
                        isActive('/promotion') 
                        ? 'text-gold transform -translate-y-1' 
                        : 'text-ash hover:text-gold'
                    }`}
                >
                    <FiUsers size={24} className={isActive('/promotion') ? 'fill-gold/20' : ''} />
                    <span className="text-[10px] sm:text-xs mt-1 font-medium">Refer</span>
                </Link>

                <Link 
                    to="/profile" 
                    className={`flex flex-col items-center p-2 transition-all duration-300 ${
                        isActive('/profile') 
                        ? 'text-gold transform -translate-y-1' 
                        : 'text-ash hover:text-gold'
                    }`}
                >
                    <FiUser size={24} className={isActive('/profile') ? 'fill-gold/20' : ''} />
                    <span className="text-[10px] sm:text-xs mt-1 font-medium">Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default BottomNav;
