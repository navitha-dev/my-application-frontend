import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTrendingUp, FiClock, FiCheckCircle, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';
import { SubscriptionSkeleton } from '../../components/Skeletons';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeUntilNextPayout, setTimeUntilNextPayout] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubscriptions();

        // Update countdown every second
        const interval = setInterval(() => {
            updateCountdown();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const updateCountdown = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        const diff = midnight - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeUntilNextPayout(`${hours}h ${minutes}m ${seconds}s`);
    };

    const fetchSubscriptions = async () => {
        try {
            const response = await apiService.subscription.getSubscriptions();
            if (response.success) {
                setSubscriptions(response.data);
            }
        } catch (error) {
            toast.error('Failed to load subscriptions');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-700';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-700';
            case 'CANCELLED':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getDaysRemaining = (subscription) => {
        return subscription.durationDays - subscription.completedDays;
    };

    if (loading) {
        return <SubscriptionSkeleton />;
    }

    const activeSubscriptions = subscriptions.filter(sub => sub.status === 'ACTIVE');

    return (
        <div className="min-h-screen bg-ivory pb-6">
            <div className="gradient-gold p-6 text-obsidian">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-lg mr-3">
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-heading">My Investments</h1>
                        <p className="text-sm text-obsidian/80">{subscriptions.length} total investments</p>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6">
                {/* Next Payout Timer - Only show if there are active subscriptions */}
                {activeSubscriptions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-premium p-4 mb-6 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gold/20 rounded-full">
                                    <FiClock size={24} className="text-gold" />
                                </div>
                                <div>
                                    <p className="text-sm text-ash">Next Daily Payout In</p>
                                    <p className="text-xl font-bold text-gold">{timeUntilNextPayout}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-ash">Active Plans</p>
                                <p className="text-2xl font-bold text-obsidian">{activeSubscriptions.length}</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {subscriptions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-ash mb-4">No investments yet</p>
                        <button onClick={() => navigate('/products')} className="btn-primary">
                            View Investment Plans
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {subscriptions.map((sub) => {
                            // Calculate days elapsed from start date
                            const startDate = new Date(sub.startDate);
                            const now = new Date();
                            const daysDiff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

                            // Use actual elapsed days, but cap at duration and completedDays
                            const daysElapsed = Math.min(daysDiff, sub.durationDays);
                            const actualCompletedDays = Math.max(sub.completedDays, daysElapsed);

                            const daysRemaining = sub.durationDays - actualCompletedDays;
                            const progressPercentage = (actualCompletedDays / sub.durationDays) * 100;
                            const isCompleted = sub.status === 'COMPLETED' || actualCompletedDays >= sub.durationDays;

                            return (
                                <motion.div
                                    key={sub.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="card-premium p-6"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-obsidian text-lg">{sub.product?.name || 'Investment'}</h3>
                                            <p className="text-xs text-ash">Started: {new Date(sub.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(sub.status)}`}>
                                            {sub.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-ash">Invested Amount</p>
                                            <p className="font-bold text-gold">₹{sub.investedAmount}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-ash">Daily Income</p>
                                            <p className="font-bold text-green-600">₹{sub.dailyIncome}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-ash">
                                                Earned So Far
                                                {actualCompletedDays > sub.completedDays && (
                                                    <span className="ml-1 text-gold" title="Calculated from investment date">*</span>
                                                )}
                                            </p>
                                            <p className="font-bold text-obsidian">
                                                ₹{(actualCompletedDays * sub.dailyIncome).toFixed(2)}
                                            </p>
                                            {actualCompletedDays > sub.completedDays && (
                                                <p className="text-[10px] text-gold mt-0.5">
                                                    (₹{((actualCompletedDays - sub.completedDays) * sub.dailyIncome).toFixed(2)} pending)
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-ash">Total Returns</p>
                                            <p className="font-bold text-gold">₹{sub.totalIncome}</p>
                                        </div>
                                    </div>

                                    {/* Monthly Installment Section (Mutual Funds Products) */}
                                    {sub.product?.category === 'MUTUAL' && sub.installmentsPaid < sub.totalInstallments && (
                                        <div className="mb-4 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                                            <div className="flex justify-between items-center mb-3">
                                                <div>
                                                    <p className="text-sm font-bold text-orange-800">Monthly Installment</p>
                                                    <p className="text-xs text-orange-600">
                                                        Paid: {sub.installmentsPaid} / {sub.totalInstallments}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-orange-600">Next Due</p>
                                                    <p className="text-sm font-bold text-orange-800">
                                                        {new Date(sub.nextPaymentDueDate).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        const response = await apiService.subscription.payInstallment(sub.id);
                                                        if (response.success) {
                                                            toast.success(response.message);
                                                            fetchSubscriptions();
                                                        }
                                                    } catch (error) {
                                                        toast.error(error.message || 'Payment failed');
                                                    }
                                                }}
                                                className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm"
                                            >
                                                Pay Installment (₹{sub.product.price})
                                            </button>
                                        </div>
                                    )}

                                    {/* Progress Section */}
                                    <div className={`p-4 rounded-lg ${isCompleted ? 'bg-blue-50 border border-blue-200' : 'bg-gold/10 border border-gold/20'}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-ash flex items-center font-medium">
                                                {isCompleted ? (
                                                    <>
                                                        <FiCheckCircle className="mr-2 text-blue-600" />
                                                        <span className="text-blue-600 font-semibold">Plan Completed!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiTrendingUp className="mr-2 text-gold" />
                                                        <span className="text-obsidian">Investment Progress</span>
                                                    </>
                                                )}
                                            </span>
                                            <span className="text-sm font-bold text-obsidian">
                                                {Math.round(progressPercentage)}%
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercentage}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={`h-3 rounded-full transition-all ${isCompleted ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-gold to-gold-dark'} shadow-sm`}
                                            ></motion.div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-ash flex items-center">
                                                <FiClock className="mr-1" size={12} />
                                                Day {actualCompletedDays} of {sub.durationDays}
                                            </span>
                                            {!isCompleted && (
                                                <span className="text-obsidian font-semibold">
                                                    {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left
                                                </span>
                                            )}
                                            {isCompleted && (
                                                <span className="text-blue-600 font-semibold flex items-center gap-1">
                                                    All earnings credited! <FiStar className="text-yellow-400" size={14} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Subscriptions;
