import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiTrendingUp, FiInfo } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Calculator = () => {
    const navigate = useNavigate();

    // State
    const [amount, setAmount] = useState(10000);
    const [rate, setRate] = useState(3); // Daily Return %
    const [days, setDays] = useState(30);

    // Calculations
    const dailyIncome = (amount * rate) / 100;
    const totalProfit = dailyIncome * days;
    const totalValue = amount + totalProfit;

    // Chart Data
    const data = [
        { name: 'Invested', value: amount, color: '#E5E7EB' }, // Gray
        { name: 'Profit', value: totalProfit, color: '#F59E0B' } // Gold
    ];

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <FiArrowLeft size={24} className="text-obsidian" />
                    </button>
                    <h1 className="text-xl font-bold text-obsidian">Return Estimator</h1>
                </div>
            </div>

            <div className="container-custom px-4 mt-6">

                {/* Result Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Value</p>
                            <h2 className="text-3xl font-bold text-obsidian flex items-center">
                                {formatCurrency(totalValue)}
                            </h2>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Total Profit</p>
                            <h3 className="text-xl font-bold text-green-600">+{formatCurrency(totalProfit)}</h3>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-64 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <p className="text-xs text-gray-400">Yield</p>
                            <p className="text-xl font-bold text-gold">{rate}% / day</p>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                            <span className="text-xs text-gray-500">Invested</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gold"></div>
                            <span className="text-xs text-gray-500">Wealth Gained</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                    {/* Amount Slider */}
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="font-bold text-obsidian">Investment</label>
                            <div className="bg-green-50 text-green-700 px-3 py-1 rounded-lg font-bold text-sm">
                                {formatCurrency(amount)}
                            </div>
                        </div>
                        <input
                            type="range"
                            min="500"
                            max="500000"
                            step="500"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gold"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>₹500</span>
                            <span>₹5L</span>
                        </div>
                    </div>

                    {/* Rate Slider */}
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="font-bold text-obsidian flex items-center gap-2">
                                Daily Return <FiInfo size={14} className="text-gray-300" />
                            </label>
                            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold text-sm">
                                {rate}%
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>1%</span>
                            <span>10%</span>
                        </div>
                    </div>

                    {/* Duration Slider */}
                    <div>
                        <div className="flex justify-between mb-4">
                            <label className="font-bold text-obsidian">Duration</label>
                            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg font-bold text-sm">
                                {days} Days
                            </div>
                        </div>
                        <input
                            type="range"
                            min="7"
                            max="365"
                            step="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>7 Days</span>
                            <span>365 Days</span>
                        </div>
                    </div>

                </div>

                {/* CTA */}
                <div className="mt-8">
                    <button
                        onClick={() => navigate('/products')}
                        className="w-full bg-gold text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        <FiTrendingUp />
                        Start Investing Now
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        *Returns are estimates based on selected rate. Actual returns may vary by plan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
