import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiShoppingBag, FiUsers, FiUser, FiTrendingUp, FiClock, FiHeart, FiSearch, FiFilter } from 'react-icons/fi';
import { FaHeart, FaRupeeSign, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';
import { ProductCardSkeleton } from '../../components/Skeletons';
import { useAuth } from '../../context/AuthContext';
import BottomNav from '../../components/BottomNav';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investing, setInvesting] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [activeCategory, setActiveCategory] = useState('NORMAL');
    const [favorites, setFavorites] = useState(new Set());
    const [isAgreed, setIsAgreed] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchProducts();
        fetchWalletBalance();
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await apiService.favorites.getFavorites();
            if (response.success && Array.isArray(response.data)) {
                const favIds = new Set(response.data.map(p => p.id));
                setFavorites(favIds);
            }
        } catch (error) {
            console.error('Failed to load favorites');
        }
    };

    const handleToggleFavorite = async (e, product) => {
        e.stopPropagation();
        try {
            const response = await apiService.favorites.toggle(product.id);
            if (response.success) {
                setFavorites(prev => {
                    const newFavs = new Set(prev);
                    if (newFavs.has(product.id)) newFavs.delete(product.id);
                    else newFavs.add(product.id);
                    return newFavs;
                });
                toast.success(response.message);
            }
        } catch (error) {
            toast.error('Failed to update watchlist');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await apiService.product.getProducts();
            if (response.success) {
                setProducts(response.data);
            }
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchWalletBalance = async () => {
        try {
            const response = await apiService.user.getWallet();
            if (response.success) {
                setWalletBalance(response.data.walletBalance);
            }
        } catch (error) {
            console.error('Failed to load wallet balance', error);
        }
    };

    const handleInvest = (product) => {
        if (!user || user.kycStatus !== 'VERIFIED') {
            let message = 'Account Restricted: Complete KYC to start investing';
            let duration = 1500;

            if (user?.kycStatus === 'SUBMITTED') {
                message = 'Account Restricted: KYC is under review. Please wait for verification.';
                duration = 3000;
            } else if (user?.kycStatus === 'REJECTED') {
                message = 'Account Restricted: KYC Rejected. Please resubmit.';
            }

            toast.error(message, {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
            setTimeout(() => navigate('/kyc'), duration);
            return;
        }

        setSelectedProduct(product);
        setInvestmentAmount(product.price); // Default to product price
        setIsAgreed(false);
        setShowModal(true);
    };

    const confirmInvestment = async () => {
        if (!selectedProduct) return;

        const amountToInvest = selectedProduct.category === 'MUTUAL' ? investmentAmount : selectedProduct.price;

        if ((Number(walletBalance) || 0) < Number(amountToInvest)) {
            toast.error('Insufficient wallet balance. Please deposit.');
            return;
        }

        setInvesting(true);
        try {
            const response = await apiService.subscription.investInProduct(selectedProduct.id, amountToInvest);
            if (response.success) {
                toast.success(response.message);
                setShowModal(false);
                navigate('/subscriptions');
            }
        } catch (error) {
            toast.error(error.message || 'Investment failed');
        } finally {
            setInvesting(false);
        }
    };

    const filteredProducts = products.filter(product => {
        if (!product.category) return activeCategory === 'NORMAL'; // Default for old products
        return product.category === activeCategory;
    });

    const categories = [
        { id: 'NORMAL', label: 'Plans' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pb-20">
                {/* Header Skeleton */}
                <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                </div>

                {/* Categories Skeleton */}
                <div className="px-4 mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-10 w-28 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
                    ))}
                </div>

                {/* Products Grid Skeleton */}
                <div className="container-custom mt-4 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory pb-24 md:pb-8">
            {/* Header - Groww Style */}
            <div className="bg-white px-6 py-4 sticky top-0 z-20 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold font-heading text-obsidian">Investments</h1>
                    <p className="text-xs text-charcoal">Explore high return plans</p>
                </div>
                <div className="flex gap-3">
                    <button className="p-2 bg-gray-50 rounded-full text-obsidian hover:bg-gray-100 transition-colors">
                        <FiSearch size={20} />
                    </button>
                    <button className="p-2 bg-gray-50 rounded-full text-obsidian hover:bg-gray-100 transition-colors">
                        <FiFilter size={20} />
                    </button>
                </div>
            </div>

            {/* Categories Tabs - Clean & Horizontal */}
            <div className="sticky top-[73px] z-10 bg-ivory/95 backdrop-blur-sm pt-4 pb-2 px-4 border-b border-transparent">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2 rounded-full text-sm font-mdeium whitespace-nowrap transition-all border ${activeCategory === cat.id
                                ? 'bg-obsidian text-primary border-obsidian shadow-lg shadow-obsidian/20'
                                : 'bg-white text-charcoal border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="container-custom mt-2 px-4">
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <FiShoppingBag size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-obsidian">No plans found</h3>
                        <p className="text-ash text-sm mt-1">Check back later for new {categories.find(c => c.id === activeCategory)?.label}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all cursor-pointer relative group"
                                onClick={() => handleInvest(product)}
                            >
                                {/* Tag - Top Right */}
                                <div className="absolute top-4 right-4 z-10 flex gap-2">
                                    <button
                                        onClick={(e) => handleToggleFavorite(e, product)}
                                        className={`transition-colors ${favorites.has(product.id) ? 'text-red-500' : 'text-gray-300 hover:text-gray-400'}`}
                                    >
                                        {favorites.has(product.id) ? <FaHeart size={20} /> : <FiHeart size={20} />}
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <FaRupeeSign className="text-primary text-2xl" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-obsidian text-lg leading-tight line-clamp-1">{product.name}</h3>
                                            {product.category === 'IPO' && (
                                                <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded">IPO</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="text-xs bg-gray-100 text-charcoal px-2 py-0.5 rounded-md font-medium">
                                                {product.durationDays} Days
                                            </span>
                                            <span className="text-xs text-ash">•</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-bold text-obsidian">4.5</span>
                                                <FaStar className="text-yellow-400 text-[10px]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between py-4 border-t border-gray-50 border-b mb-4">
                                    <div>
                                        <p className="text-xs text-charcoal mb-1">Min Investment</p>
                                        <p className="font-bold text-obsidian text-base">₹{product.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-charcoal mb-1">Daily Returns</p>
                                        <p className="font-bold text-primary text-base">+₹{product.dailyIncome}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-charcoal mb-1">Total Returns</p>
                                        <p className="font-bold text-primary text-base">+₹{product.totalIncome}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-xs text-ash">
                                        <span className="text-primary font-bold bg-primary/5 px-2 py-1 rounded">High Growth</span>
                                    </div>
                                    <span className="text-primary font-medium text-sm group-hover:underline">View Details</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Investment Confirmation Modal */}
            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fade-in">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    >
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>

                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-obsidian">Confirm Order</h3>
                                <p className="text-sm text-ash">{selectedProduct.name}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            {/* Amount Input Section */}
                            {selectedProduct.category === 'MUTUAL' ? (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-charcoal mb-2">
                                        Monthly SIP Amount (Min ₹{selectedProduct.price})
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-bold">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="block w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-lg font-bold text-obsidian"
                                            value={investmentAmount}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setInvestmentAmount(val);
                                            }}
                                            min={selectedProduct.price}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="range"
                                            min={selectedProduct.price}
                                            max={selectedProduct.price * 10}
                                            step={100}
                                            value={investmentAmount || selectedProduct.price}
                                            onChange={(e) => setInvestmentAmount(e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <span className="text-charcoal text-sm">Investment Amount</span>
                                    <span className="font-bold text-obsidian">₹{selectedProduct.price}</span>
                                </div>
                            )}

                            {/* Wallet Balance - Mandatory Info First */}
                            <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                <span className="text-charcoal text-sm">Wallet Balance</span>
                                <span className={`font-bold ${(Number(walletBalance) || 0) >= Number(investmentAmount || selectedProduct.price) ? 'text-charcoal' : 'text-red-500'}`}>
                                    ₹{walletBalance}
                                </span>
                            </div>

                            {/* Returns Calculation - Secondary Info */}
                            {selectedProduct.category === 'MUTUAL' ? (
                                <div className="grid grid-cols-2 gap-4 mt-2 bg-primary/5 p-3 rounded-lg border border-primary/10">
                                    <div>
                                        <p className="text-xs text-charcoal mb-1">Est. Daily Returns</p>
                                        <p className="font-semibold text-primary">
                                            ₹{((Number(investmentAmount) / Number(selectedProduct.price)) * Number(selectedProduct.dailyIncome)).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-charcoal mb-1">Totals Returns</p>
                                        <p className="font-semibold text-primary">
                                            ₹{((Number(investmentAmount) / Number(selectedProduct.price)) * Number(selectedProduct.totalIncome)).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center py-3">
                                    <span className="text-charcoal text-sm">Total Returns</span>
                                    <span className="font-bold text-primary">₹{selectedProduct.totalIncome}</span>
                                </div>
                            )}

                            {/* Terms Checkbox */}
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                                <div className="pt-0.5">
                                    <input
                                        type="checkbox"
                                        id="agree_terms"
                                        checked={isAgreed}
                                        onChange={(e) => setIsAgreed(e.target.checked)}
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                    />
                                </div>
                                <label htmlFor="agree_terms" className="text-xs text-charcoal leading-relaxed cursor-pointer select-none">
                                    I acknowledge that I have read the investment details and agree to the <span className="text-primary font-medium">Terms of Service</span> and <span className="text-primary font-medium">Risk Disclosure</span>. I understand that returns are subject to market risks.
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>

                            {(Number(walletBalance) || 0) < Number(investmentAmount || selectedProduct.price) ? (
                                <Link
                                    to="/recharge"
                                    className="btn-primary flex-1 text-center"
                                >
                                    Deposit
                                </Link>
                            ) : (
                                <button
                                    onClick={confirmInvestment}
                                    className="btn-primary flex-1"
                                    disabled={investing || !isAgreed || (!investmentAmount && selectedProduct.category === 'MUTUAL') || (selectedProduct.category === 'MUTUAL' && Number(investmentAmount) < Number(selectedProduct.price))}
                                >
                                    {investing ? 'Processing...' : 'Invest Now'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Products;
