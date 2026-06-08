import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUsers, FiGift, FiCopy, FiCheck, FiCalendar, FiClock } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const ReferralEarnings = () => {
    const [earnings, setEarnings] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [earningsResponse, profileResponse] = await Promise.all([
                apiService.referral.getEarnings(),
                apiService.user.getProfile()
            ]);

            if (earningsResponse.success) {
                setEarnings(earningsResponse.data);
            }

            if (profileResponse.success) {
                setSummary({
                    referralCode: profileResponse.data.referralCode,
                    totalReferralEarnings: profileResponse.data.totalReferralEarnings,
                    totalReferrals: profileResponse.data.totalReferrals || 0
                });
            }
        } catch (error) {
            toast.error('Failed to load referral data');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory pb-6">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <FiArrowLeft size={22} className="text-obsidian" />
                </button>
                <h1 className="text-xl font-bold font-heading text-obsidian">Referral History</h1>
            </div>

            <div className="container-custom mt-6 px-4">
                {/* Summary Card */}
                <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm">
                    <p className="text-sm text-ash mb-1">Total Earnings</p>
                    <h2 className="text-3xl font-bold text-primary flex items-center gap-1">
                        <span className="text-lg text-gray-400">₹</span>
                        {summary?.totalReferralEarnings || '0.00'}
                    </h2>
                    <div className="mt-4 flex gap-4 text-sm">
                        <div className="bg-gray-50 px-3 py-1.5 rounded-lg text-charcoal">
                            <span className="font-bold text-obsidian">{summary?.totalReferrals || 0}</span> Referrals
                        </div>
                    </div>
                </div>

                {/* Earnings List */}
                <div>
                    <h3 className="text-sm font-bold text-ash uppercase tracking-wider mb-4 px-1">Recent Transactions</h3>

                    {earnings.length === 0 ? (
                        <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiUsers size={24} className="text-gray-300" />
                            </div>
                            <p className="text-obsidian font-medium">No earnings yet</p>
                            <p className="text-sm text-ash mt-1">Invite friends to start earning ₹500 rewards.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {earnings.map((earning, index) => (
                                <motion.div
                                    key={earning.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${earning.commissionAmount >= 500 ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                            <FaRupeeSign size={14} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-obsidian text-sm">
                                                {earning.referredUser?.fullName || 'Friend'}
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-ash flex items-center gap-1">
                                                    <FiCalendar size={10} /> {formatDate(earning.createdAt)}
                                                </span>
                                                {earning.earningType && (
                                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-charcoal">
                                                        {earning.earningType === 'REGISTRATION' ? 'Bonus' : 'Comm.'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold text-green-600 text-base">
                                            +₹{earning.commissionAmount}
                                        </p>
                                        <p className="text-xs text-ash">
                                            Success
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReferralEarnings;
