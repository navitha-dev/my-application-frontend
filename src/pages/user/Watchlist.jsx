import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiTrendingUp, FiClock, FiTrash2 } from 'react-icons/fi';
import { FaHeart, FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const Watchlist = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            const response = await apiService.favorites.getFavorites();
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Watchlist fetch error:", error);
            // Silent fail or toast depending on preference, backend fix should prevent 403
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (e, id) => {
        e.stopPropagation();
        // Optimistic UI update
        const previousProducts = [...products];
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success('Removed from watchlist');

        try {
            const response = await apiService.favorites.toggle(id);
            if (!response.success) {
                // Revert if failed
                setProducts(previousProducts);
                toast.error('Failed to remove');
            }
        } catch (error) {
            setProducts(previousProducts);
            toast.error('Network error');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        exit: {
            scale: 0.9,
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-safe">
            {/* Premium Header */}
            <div className="bg-white sticky top-0 z-20 shadow-sm border-b border-gray-100">
                <div className="container-custom px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors text-obsidian"
                        >
                            <FiArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-obsidian font-heading">My Watchlist</h1>
                            <p className="text-xs text-ash font-medium">
                                {products.length} {products.length === 1 ? 'Item' : 'Items'} Saved
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom px-4 mt-6 pb-24">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white h-40 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-6 relative">
                            <FiHeart className="text-gold" size={40} />
                            <div className="absolute top-2 right-2 w-4 h-4 bg-gold rounded-full animate-ping" />
                        </div>
                        <h3 className="text-2xl font-bold text-obsidian mb-2 font-heading">Your Watchlist is Empty</h3>
                        <p className="text-ash max-w-xs mx-auto mb-8 leading-relaxed">
                            Tap the heart icon on any plan to save it here for quick access later.
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="btn-primary flex items-center gap-2 px-8 shadow-gold/20 shadow-lg hover:shadow-gold/40"
                        >
                            <FiTrendingUp />
                            Explore Plans
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        <AnimatePresence>
                            {products.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    layout
                                    exit="exit"
                                    onClick={() => navigate(`/products`, { state: { highlight: product.id } })}
                                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer"
                                >
                                    {/* Touch Ripple Effect (CSS only) */}
                                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                    <div className="flex gap-4">
                                        {/* Image / Icon */}
                                        <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt="" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <FiTrendingUp className="text-gold/80" size={32} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-obsidian text-lg truncate pr-6 font-heading">
                                                    {product.name}
                                                </h3>
                                                <button
                                                    onClick={(e) => handleRemove(e, product.id)}
                                                    className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
                                                    aria-label="Remove from watchlist"
                                                >
                                                    <FaHeart size={20} className="drop-shadow-sm" />
                                                </button>
                                            </div>

                                            <div className="mt-2 flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-gold font-heading">₹{product.dailyIncome}</span>
                                                <span className="text-xs text-ash font-medium">/day</span>
                                            </div>

                                            <div className="mt-3 flex items-center gap-4 text-xs font-medium text-ash">
                                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                                                    <FaRupeeSign size={12} className="text-obsidian" />
                                                    <span>{product.price}</span>
                                                </div>
                                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                                                    <FiClock size={12} className="text-obsidian" />
                                                    <span>{product.durationDays} Days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags/Badges */}
                                    {product.dailyIncome > 500 && (
                                        <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm">
                                            HIGH RETURN
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
