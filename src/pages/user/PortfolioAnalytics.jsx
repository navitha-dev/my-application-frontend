import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FiArrowLeft, FiTrendingUp, FiPieChart,
    FiActivity, FiAward, FiTarget
} from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import {
    PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const PortfolioAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await apiService.portfolio.getAnalytics();
            if (response.success) {
                setAnalytics(response.data);
            }
        } catch (error) {
            toast.error('Failed to load portfolio analytics');
            console.error('Analytics error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
                    <p className="mt-4 text-charcoal">Loading analytics...</p>
                </div>
            </div>
        );
    }

    const COLORS = ['#D4AF37', '#34ce57', '#6366f1', '#f59e0b', '#ef4444'];

    // Prepare pie chart data
    const pieData = analytics?.categoryBreakdown?.map((item, index) => ({
        name: item.category,
        value: parseFloat(item.totalInvested || 0),
        count: item.investmentCount,
        earnings: parseFloat(item.totalEarnings || 0)
    })) || [];

    // Prepare line chart data
    const lineData = analytics?.monthlyPerformance?.map(item => ({
        month: item.month,
        invested: parseFloat(item.invested || 0),
        earned: parseFloat(item.earned || 0),
        profit: parseFloat(item.profit || 0)
    })) || [];

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-gold to-yellow-500 text-white p-6 sticky top-0 z-10 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <Link to="/home">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                        >
                            <FiArrowLeft size={20} />
                        </motion.button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Portfolio Analytics</h1>
                        <p className="text-white/80 text-sm">Track your investment performance</p>
                    </div>
                </div>

                {/* Overall Stats */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-white/70 text-xs mb-1">Total Invested</p>
                        <p className="text-xl font-bold">₹{analytics?.totalInvested?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-white/70 text-xs mb-1">Total Earnings</p>
                        <p className="text-xl font-bold text-green-300">₹{analytics?.totalEarnings?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-white/70 text-xs mb-1">Total Profit</p>
                        <p className="text-xl font-bold text-green-300">₹{analytics?.totalProfit?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-white/70 text-xs mb-1">Overall ROI</p>
                        <p className="text-xl font-bold text-yellow-300">{analytics?.overallROI?.toFixed(2) || '0'}%</p>
                    </div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Investment Summary Cards */}
                <div className="grid grid-cols-3 gap-3">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl p-4 shadow-md text-center"
                    >
                        <FiActivity className="text-blue-600 mx-auto mb-2" size={24} />
                        <p className="text-2xl font-bold text-obsidian">{analytics?.activeInvestments || 0}</p>
                        <p className="text-xs text-charcoal mt-1">Active</p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-4 shadow-md text-center"
                    >
                        <FiAward className="text-green-600 mx-auto mb-2" size={24} />
                        <p className="text-2xl font-bold text-obsidian">{analytics?.completedInvestments || 0}</p>
                        <p className="text-xs text-charcoal mt-1">Completed</p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl p-4 shadow-md text-center"
                    >
                        <FiTarget className="text-gold mx-auto mb-2" size={24} />
                        <p className="text-2xl font-bold text-obsidian">{analytics?.totalInvestments || 0}</p>
                        <p className="text-xs text-charcoal mt-1">Total</p>
                    </motion.div>
                </div>

                {/* Category Breakdown Pie Chart */}
                {pieData.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl p-6 shadow-md"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <FiPieChart className="text-gold" size={20} />
                            <h2 className="text-lg font-bold text-obsidian">Investment Distribution</h2>
                        </div>

                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Category Stats */}
                        <div className="space-y-3 mt-4">
                            {analytics?.categoryBreakdown?.map((category, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <div>
                                            <p className="font-semibold text-obsidian">{category.category}</p>
                                            <p className="text-xs text-charcoal">{category.investmentCount} investments</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gold">₹{parseFloat(category.totalInvested || 0).toLocaleString()}</p>
                                        <p className="text-xs text-green-600">+₹{parseFloat(category.totalEarnings || 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Monthly Performance Line Chart */}
                {lineData.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl p-6 shadow-md"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <FiTrendingUp className="text-gold" size={20} />
                            <h2 className="text-lg font-bold text-obsidian">Monthly Performance</h2>
                        </div>

                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="invested" stroke="#D4AF37" strokeWidth={2} name="Invested" />
                                <Line type="monotone" dataKey="earned" stroke="#34ce57" strokeWidth={2} name="Earned" />
                                <Line type="monotone" dataKey="profit" stroke="#6366f1" strokeWidth={2} name="Profit" />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                )}

                {/* Top Performing Investments */}
                {analytics?.topPerformingInvestments?.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl p-6 shadow-md"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <FiAward className="text-gold" size={20} />
                            <h2 className="text-lg font-bold text-obsidian">Top Performers</h2>
                        </div>

                        <div className="space-y-3">
                            {analytics.topPerformingInvestments.map((investment, index) => (
                                <div key={investment.subscriptionId} className="p-4 bg-gradient-to-r from-gold/5 to-transparent border-l-4 border-gold rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 bg-gold text-white text-xs font-bold rounded">#{index + 1}</span>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">{investment.category}</span>
                                            </div>
                                            <p className="font-bold text-obsidian">{investment.productName}</p>
                                            <div className="flex gap-4 mt-2 text-xs">
                                                <div>
                                                    <p className="text-charcoal">Invested</p>
                                                    <p className="font-semibold text-obsidian">₹{parseFloat(investment.investedAmount || 0).toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-charcoal">Earned</p>
                                                    <p className="font-semibold text-green-600">₹{parseFloat(investment.earnedAmount || 0).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gold">{investment.roi?.toFixed(1)}%</p>
                                            <p className="text-xs text-charcoal">ROI</p>
                                            <div className="mt-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gold rounded-full h-2 transition-all duration-500"
                                                        style={{ width: `${Math.min(investment.progressPercentage, 100)}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-xs text-charcoal mt-1">{investment.progressPercentage}% Complete</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Recent Earnings */}
                {analytics?.recentEarnings?.length > 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl p-6 shadow-md"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <FaRupeeSign className="text-gold" size={20} />
                            <h2 className="text-lg font-bold text-obsidian">Recent Earnings</h2>
                        </div>

                        <div className="space-y-2">
                            {analytics.recentEarnings.map((earning, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <FiTrendingUp className="text-green-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-obsidian">{earning.productName}</p>
                                            <p className="text-xs text-charcoal">{earning.date}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-green-600">+₹{parseFloat(earning.amount || 0).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {analytics?.totalInvestments === 0 && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white rounded-xl p-12 text-center shadow-md"
                    >
                        <FiPieChart className="text-gray-300 mx-auto mb-4" size={64} />
                        <h3 className="text-xl font-bold text-obsidian mb-2">No Investments Yet</h3>
                        <p className="text-charcoal mb-6">Start investing to see your portfolio analytics</p>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gold text-white rounded-xl font-semibold"
                            >
                                Browse Products
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PortfolioAnalytics;
