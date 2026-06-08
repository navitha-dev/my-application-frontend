import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiAward, FiStar, FiLock, FiUnlock, FiTrendingUp } from 'react-icons/fi';
import { FaCrown, FaRupeeSign } from 'react-icons/fa';
import apiService from '../../api/apiService';
import toast from 'react-hot-toast';

const VipClub = () => {
    const [vipData, setVipData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVipStatus();
    }, []);

    const fetchVipStatus = async () => {
        try {
            const response = await apiService.vip.getStatus();
            if (response.success) {
                setVipData(response.data);
            }
        } catch (error) {
            console.error('Error fetching VIP status:', error);
            // toast.error('Failed to load VIP data');
        } finally {
            setLoading(false);
        }
    };

    const levels = [
        { name: 'BRONZE', min: 0, benefits: 'Basic Support', color: 'from-orange-400 to-orange-600' },
        { name: 'SILVER', min: 10000, benefits: '1% Extra Referral Bonus', color: 'from-gray-300 to-gray-500' },
        { name: 'GOLD', min: 50000, benefits: 'Instant Withdrawals', color: 'from-yellow-400 to-yellow-600' },
        { name: 'PLATINUM', min: 200000, benefits: 'Dedicated Manager & 24/7 Support', color: 'from-purple-500 to-pink-500' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
            </div>
        );
    }

    const currentLevelIndex = levels.findIndex(l => l.name === vipData?.currentLevel) || 0;

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-obsidian text-white p-6 sticky top-0 z-10">
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/home">
                        <button className="p-2 bg-white/10 rounded-full">
                            <FiArrowLeft size={20} />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <FaCrown className="text-gold" /> VIP Club
                        </h1>
                    </div>
                </div>

                {/* Current Status Card */}
                <div className="bg-gradient-to-r from-gold to-yellow-600 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FaCrown size={120} />
                    </div>

                    <div className="relative z-10">
                        <p className="text-white/80 text-sm font-medium mb-1">Current Status</p>
                        <h2 className="text-3xl font-bold mb-4">{vipData?.currentLevel} MEMBER</h2>

                        <div className="mb-2 flex justify-between text-xs font-medium">
                            <span>Progress to {vipData?.nextLevel}</span>
                            <span>{Math.min(vipData?.progressPercentage || 0, 100).toFixed(0)}%</span>
                        </div>

                        <div className="w-full bg-black/20 rounded-full h-2 mb-4">
                            <div
                                className="bg-white rounded-full h-2 transition-all duration-1000"
                                style={{ width: `${Math.min(vipData?.progressPercentage || 0, 100)}%` }}
                            ></div>
                        </div>

                        <div className="flex items-center gap-2 text-sm bg-black/20 inline-block px-3 py-1 rounded-lg">
                            <FiTrendingUp />
                            <span>Invest ₹{vipData?.requiredForNextLevel?.toLocaleString()} more to upgrade</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-lg font-bold text-obsidian mb-4">Membership Tiers</h3>

                <div className="space-y-4">
                    {levels.map((level, index) => {
                        const isUnlocked = index <= currentLevelIndex;
                        const isNext = index === currentLevelIndex + 1;

                        return (
                            <motion.div
                                key={level.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative rounded-xl overflow-hidden border ${isUnlocked ? 'border-gold/50 bg-white' : 'border-gray-200 bg-gray-50'}`}
                            >
                                <div className={`h-2 w-full bg-gradient-to-r ${level.color}`}></div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className={`font-bold text-lg ${isUnlocked ? 'text-obsidian' : 'text-gray-500'}`}>
                                                {level.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                Min Investment: ₹{level.min.toLocaleString()}
                                            </p>
                                        </div>
                                        {isUnlocked ? (
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                <FiUnlock size={14} />
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                                <FiLock size={14} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-start gap-2 mt-3">
                                        <FiStar className={isUnlocked ? 'text-gold mt-1' : 'text-gray-400 mt-1'} size={14} />
                                        <p className={`text-sm ${isUnlocked ? 'text-charcoal' : 'text-gray-500'}`}>
                                            {level.benefits}
                                        </p>
                                    </div>

                                    {isNext && (
                                        <div className="mt-4">
                                            <Link to="/products">
                                                <button className="w-full btn-primary py-2 text-sm">
                                                    Upgrade Now
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VipClub;
