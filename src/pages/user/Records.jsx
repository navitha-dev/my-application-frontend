import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';
import { RecordsSkeleton } from '../../components/Skeletons';

const Records = () => {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await apiService.wallet.getTransactions();
            if (response.success) {
                setTransactions(response.data);
            }
        } catch (error) {
            toast.error('Failed to load transactions');
        } finally {
            setLoading(false);
        }
    };

    const filteredTransactions = filter === 'ALL'
        ? transactions
        : transactions.filter(t => t.type === filter);

    const getTypeIcon = (type) => {
        const creditTypes = ['RECHARGE', 'DAILY_INCOME', 'REFERRAL_COMMISSION', 'CHECK_IN', 'GIFT_CODE'];
        return creditTypes.includes(type) ? FiArrowDown : FiArrowUp;
    };

    const getTypeColor = (type) => {
        const creditTypes = ['RECHARGE', 'DAILY_INCOME', 'REFERRAL_COMMISSION', 'CHECK_IN', 'GIFT_CODE'];
        return creditTypes.includes(type) ? 'text-green-600' : 'text-red-600';
    };

    if (loading) {
        return <RecordsSkeleton />;
    }

    return (
        <div className="min-h-screen bg-ivory pb-6">
            <div className="gradient-gold p-6 text-obsidian">
                <div className="flex items-center mb-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-lg mr-3">
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Transaction Records</h1>
                        <p className="text-sm text-obsidian/80">{filteredTransactions.length} transactions</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                    {['ALL', 'RECHARGE', 'WITHDRAW', 'INVESTMENT', 'DAILY_INCOME', 'REFERRAL_COMMISSION'].map(filterType => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${filter === filterType
                                ? 'bg-white text-gold'
                                : 'bg-white/20 text-obsidian hover:bg-white/30'
                                }`}
                        >
                            {filterType.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="container-custom mt-6">
                {filteredTransactions.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-ash">No transactions found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTransactions.map((txn) => {
                            const Icon = getTypeIcon(txn.type);
                            const colorClass = getTypeColor(txn.type);

                            return (
                                <motion.div
                                    key={txn.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="card p-4"
                                >
                                    <div className="flex items-center">
                                        <div className={`p-3 rounded-full mr-4 ${colorClass.includes('green') ? 'bg-green-50' : 'bg-red-50'}`}>
                                            <Icon className={colorClass} size={20} />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold text-obsidian">
                                                {txn.description || txn.type.replace('_', ' ')}
                                            </p>
                                            <p className="text-xs text-ash">
                                                {new Date(txn.createdAt).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className={`font-bold text-lg ${colorClass}`}>
                                                {getTypeIcon(txn.type) === FiArrowDown ? '+' : '-'}₹{txn.amount}
                                            </p>
                                            <span className={`text-xs px-2 py-1 rounded-full ${txn.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                                txn.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {txn.status}
                                            </span>
                                        </div>
                                    </div>

                                    {txn.adminRemarks && (
                                        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-ash">
                                            Remark: {txn.adminRemarks}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Records;
