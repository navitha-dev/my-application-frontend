import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { CardSkeleton } from '../../components/Skeletons';
import apiService from '../../api/apiService';
import { toast } from 'react-hot-toast';
import {
    HiUsers,
    HiCurrencyRupee,
    HiCreditCard,
    HiTrendingUp,
    HiCash,
    HiChartBar,
} from 'react-icons/hi';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';

const COLORS = ['#D4AF37', '#4A90E2', '#50C878', '#FF6B6B', '#9B59B6', '#F39C12'];

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-3 lg:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className={`p-2 lg:p-4 rounded-full ${color} bg-opacity-10 mr-2 lg:mr-4`}>
                    <Icon className={`w-4 h-4 lg:w-8 lg:h-8 ${color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                    <p className="text-ash text-xs lg:text-sm font-medium">{title}</p>
                    <h3 className="text-lg lg:text-2xl font-bold text-charcoal">{value}</h3>
                    {trend && (
                        <p className={`text-xs mt-1 hidden lg:block ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
                        </p>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsResponse, analyticsResponse] = await Promise.all([
                apiService.admin.getDashboardStats(),
                apiService.admin.getAnalytics()
            ]);

            if (statsResponse.success) {
                setStats(statsResponse.data);
            }

            if (analyticsResponse.success) {
                setAnalytics(analyticsResponse.data);
            }
        } catch (error) {
            console.error('Failed to fetch data', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <AdminLayout title="Analytics Dashboard">
                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse mr-4"></div>
                                <div className="flex-1">
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2"></div>
                                    <div className="h-8 w-16 bg-gray-200 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Skeleton Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>

                {/* Charts Skeleton Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>

                {/* Detailed Stats Cards Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </AdminLayout>
        );
    }

    // Prepare chart data
    const financialPieData = stats ? [
        { name: 'Total Recharge', value: parseFloat(stats.totalRecharge) || 0 },
        { name: 'Total Investment', value: parseFloat(stats.totalInvestment) || 0 },
        { name: 'Total Withdrawals', value: parseFloat(stats.totalWithdraw) || 0 },
    ] : [];

    const userStatsData = stats ? [
        { name: 'Total Users', value: stats.totalUsers || 0 },
        { name: 'Active Users', value: stats.activeUsers || 0 },
        { name: 'Inactive', value: (stats.totalUsers || 0) - (stats.activeUsers || 0) },
    ] : [];

    const earningsData = stats ? [
        { category: 'Daily Earnings', amount: parseFloat(stats.totalEarnings) || 0 },
        { category: 'Referral Earnings', amount: parseFloat(stats.totalReferralEarnings) || 0 },
        { category: 'Wallet Balance', amount: parseFloat(stats.totalWalletBalance) || 0 },
    ] : [];

    return (
        <AdminLayout title="Analytics Dashboard">
            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={HiUsers}
                        color="bg-blue-500"
                        trend={12}
                    />
                    <StatCard
                        title="Active Users"
                        value={stats.activeUsers}
                        icon={HiUsers}
                        color="bg-green-500"
                        trend={8}
                    />
                    <StatCard
                        title="Total Investment"
                        value={`₹${stats.totalInvestment}`}
                        icon={HiCash}
                        color="bg-purple-500"
                        trend={15}
                    />
                    <StatCard
                        title="Platform Profit"
                        value={`₹${stats.platformProfit}`}
                        icon={HiTrendingUp}
                        color="bg-gold"
                        trend={20}
                    />
                </div>
            )}

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 gap-4 lg:gap-6 mb-4 lg:mb-6">
                {/* User Growth Chart */}
                <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <h3 className="text-base lg:text-lg font-bold text-charcoal mb-3 lg:mb-4 flex items-center">
                        <HiChartBar className="mr-2 text-blue-500 w-5 h-5" />
                        User Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={userStatsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Bar dataKey="value" fill="#4A90E2" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Financial Overview Pie Chart */}
                <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <h3 className="text-base lg:text-lg font-bold text-charcoal mb-3 lg:mb-4 flex items-center">
                        <HiCurrencyRupee className="mr-2 text-gold w-5 h-5" />
                        Financial Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={financialPieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {financialPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Earnings Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                        <HiTrendingUp className="mr-2 text-green-500" />
                        Earnings Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={earningsData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#50C878" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Monthly Trend (if analytics data available) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center">
                        <HiChartBar className="mr-2 text-purple-500" />
                        Monthly Trend
                    </h3>
                    {analytics && analytics.monthlyData ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={analytics.monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="users" stackId="1" stroke="#4A90E2" fill="#4A90E2" />
                                <Area type="monotone" dataKey="investments" stackId="2" stroke="#D4AF37" fill="#D4AF37" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-gray-400">
                            <p>Monthly trend data will appear here</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Stats Tables */}
            {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-charcoal mb-4">Financial Details</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Total Recharge</span>
                                <span className="font-bold text-green-600">₹{stats.totalRecharge}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Total Withdrawals</span>
                                <span className="font-bold text-red-600">₹{stats.totalWithdraw}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Total Investment</span>
                                <span className="font-bold text-blue-600">₹{stats.totalInvestment}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gold/10 rounded-lg border border-gold">
                                <span className="text-charcoal font-semibold">Platform Profit</span>
                                <span className="font-bold text-gold">₹{stats.platformProfit}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-charcoal mb-4">User Wallet Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Total Wallet Balance</span>
                                <span className="font-bold text-charcoal">₹{stats.totalWalletBalance}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Total Earnings Distributed</span>
                                <span className="font-bold text-green-600">₹{stats.totalEarnings}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Referral Commissions</span>
                                <span className="font-bold text-purple-600">₹{stats.totalReferralEarnings}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-ivory rounded-lg">
                                <span className="text-ash">Pending Withdrawals</span>
                                <span className="font-bold text-orange-600">{stats.pendingWithdrawals}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;
