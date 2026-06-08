import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiHome, FiShoppingBag, FiUsers, FiUser,
    FiGift, FiCalendar, FiLogOut, FiBookOpen, FiHeart,
    FiTrendingUp, FiDownload, FiCreditCard, FiChevronRight, FiPieChart,
    FiShield, FiLock, FiCheckCircle, FiSearch, FiBell
} from 'react-icons/fi';

import { FaRupeeSign, FaCrown, FaCalculator } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

import apiService from '../../api/apiService';
import FloatingSupportButton from '../../components/FloatingSupportButton';
import { HomeSkeleton } from '../../components/Skeletons';
import UserSuccessMarquee from '../../components/UserSuccessMarquee';

const Home = () => {
    const { user, logout } = useAuth();
    const [walletData, setWalletData] = useState(null);
    const [canCheckIn, setCanCheckIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [walletResponse, checkInResponse] = await Promise.all([
                apiService.user.getWallet(),
                apiService.checkIn.getCheckInStatus()
            ]);

            if (walletResponse.success) {
                setWalletData(walletResponse.data);
            }

            if (checkInResponse.success) {
                setCanCheckIn(checkInResponse.data.canCheckIn);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckIn = async () => {
        try {
            const response = await apiService.checkIn.performCheckIn();
            if (response.success) {
                toast.success(response.message);
                setCanCheckIn(false);
                fetchData(); // Refresh wallet data
            }
        } catch (error) {
            toast.error(error.message || 'Check-in failed');
        }
    };

    if (loading) {
        return <HomeSkeleton />;
    }

    return (
        <div className="min-h-screen bg-ivory transition-colors duration-200">
            {/* Mobile Header (Groww Style) */}
            <div className="md:hidden bg-white px-4 py-3 sticky top-0 z-20 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                </div>

                {/* Search Bar - Visual Only */}
                <div className="flex-1 mx-4">
                    <div className="bg-gray-50 rounded-full px-4 py-2 flex items-center gap-2 border border-gray-100">
                        <FiSearch className="text-gray-400" />
                        <span className="text-sm text-gray-400">Search stocks, funds...</span>
                    </div>
                </div>

                <div className="flex gap-3 text-obsidian">
                    <FiBell className="text-xl" />
                </div>
            </div>

            {/* Desktop Header / Dashboard Title */}
            <div className="hidden md:flex justify-between items-center p-6 bg-white border-b border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold font-heading text-obsidian">Dashboard</h1>
                    <p className="text-sm text-ash">Welcome back, {user?.fullName}</p>
                </div>
                <button onClick={logout} className="p-2 border border-gray-200 rounded-lg md:hidden text-charcoal hover:bg-gray-50 transition-colors">
                    <FiLogOut size={18} />
                </button>
            </div>

            <div className="p-4 md:p-8 pb-32 md:pb-8">
                {/* Wallet/Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Main Balance Card - Refined */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <p className="text-sm text-charcoal font-medium mb-2">Total Portfolio Value</p>
                                    <h2 className="text-4xl font-bold text-obsidian flex items-center gap-0.5 tracking-tight">
                                        <span className="text-2xl text-gray-400">₹</span>
                                        {walletData?.walletBalance || '0.00'}
                                    </h2>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                                            +12.5% Returns
                                        </span>
                                        <span className="text-xs text-ash">1 Day Change</span>
                                    </div>
                                </div>
                                <div className="hidden md:flex gap-2">
                                    <Link to="/recharge" className="btn-primary text-sm py-2 px-5">
                                        Deposit
                                    </Link>
                                    <Link to="/withdraw" className="btn-secondary text-sm py-2 px-5">
                                        Withdraw
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Buttons */}
                            <div className="grid grid-cols-2 gap-3 md:hidden mb-6">
                                <Link to="/recharge" className="btn-primary text-sm py-3 text-center">
                                    Deposit
                                </Link>
                                <Link to="/withdraw" className="btn-secondary text-sm py-3 text-center bg-gray-50/50">
                                    Withdraw
                                </Link>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                                <div>
                                    <p className="text-xs text-ash mb-1">Invested</p>
                                    <p className="font-bold text-obsidian text-lg">₹{walletData?.totalInvestment || '0'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-ash mb-1">Current</p>
                                    <p className="font-bold text-primary text-lg">₹{Number(walletData?.totalInvestment || 0) + Number(walletData?.totalEarnings || 0)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-ash mb-1">Total Returns</p>
                                    <p className="font-bold text-primary text-lg">+₹{walletData?.totalEarnings || '0'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Check-in Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-[#1b1f23] to-[#2c3035] text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FiCalendar size={100} />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2 text-warning">
                                <FaCrown />
                                <span className="text-xs font-bold uppercase tracking-wider">Daily Reward</span>
                            </div>
                            <h3 className="font-bold text-xl mb-1">Login Streak</h3>
                            <p className="text-gray-400 text-sm">Earn rewards every day you check in.</p>
                        </div>

                        <button
                            onClick={handleCheckIn}
                            disabled={!canCheckIn}
                            className={`mt-6 w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-sm ${canCheckIn
                                ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'
                                : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                        >
                            {canCheckIn ? 'Claim ₹5 Reward' : 'Come back tomorrow'}
                        </button>
                    </motion.div>
                </div>

                {/* Quick Actions (Groww Style Pill Menu on Mobile) */}
                <h3 className="text-lg font-bold text-obsidian mb-4 px-1">Quick Actions</h3>

                {/* Grid Container for Mobile and Desktop */}
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-6 gap-x-2 md:gap-4 pb-4 md:pb-8">
                    {[
                        { to: '/subscriptions', icon: FiShoppingBag, label: 'My Investments', color: 'text-blue-600', bg: 'bg-blue-50' },
                        { to: '/promotion', icon: FiUsers, label: 'Invite', color: 'text-green-600', bg: 'bg-green-50' },
                        { to: '/records', icon: FiDownload, label: 'Records', color: 'text-teal-600', bg: 'bg-teal-50' },
                        { to: '/support', icon: FiShield, label: 'Support', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { to: '/vip-club', icon: FaCrown, label: 'VIP Club', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                        { to: '/calculator', icon: FaCalculator, label: 'Calculator', color: 'text-blue-600', bg: 'bg-blue-50' },
                        { to: '/gift', icon: FiGift, label: 'Redeem', color: 'text-purple-600', bg: 'bg-purple-50' },
                        { to: '/academy', icon: FiBookOpen, label: 'Learn', color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((item, idx) => (
                        <Link key={idx} to={item.to} className="flex flex-col items-center justify-start w-full">
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ y: -5 }}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-2 shadow-sm border border-gray-50/50`}
                            >
                                <item.icon className={`text-xl md:text-2xl ${item.color}`} />
                            </motion.div>
                            <span className="text-[11px] md:text-xs font-medium text-charcoal text-center leading-tight">{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Groww Style "Collections" / Trust Section */}
                <UserSuccessMarquee />

                <div className="mt-4">
                    <h3 className="text-lg font-bold text-obsidian mb-4 px-1">Explore Collections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                <FiTrendingUp size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-obsidian">High Return</h4>
                                <p className="text-xs text-ash">Plans with &gt;20% returns</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                <FiShield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-obsidian">Safe Income</h4>
                                <p className="text-xs text-ash">Guaranteed fixed returns</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-500">
                                <FaCrown size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-obsidian">VIP Access</h4>
                                <p className="text-xs text-ash">Exclusive for VIP members</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Floating Support Button */}
            <FloatingSupportButton />
        </div>
    );
};

export default Home;
