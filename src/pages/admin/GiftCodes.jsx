import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import apiService from '../../api/apiService';
import { toast } from 'react-hot-toast';
import { HiGift, HiClipboardCopy } from 'react-icons/hi';

const AdminGiftCodes = () => {
    const [amount, setAmount] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [maxRedemptions, setMaxRedemptions] = useState('');
    const [generatedCode, setGeneratedCode] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Format date if provided
            // Format date if provided
            let formattedDate = null;
            if (expiryDate) {
                // Java LocalDateTime.parse() expects 'YYYY-MM-DDTHH:mm:ss' without Z
                formattedDate = new Date(expiryDate).toISOString().slice(0, 19);
            }

            const response = await apiService.admin.createGiftCode(
                amount,
                formattedDate,
                maxRedemptions || null
            );

            if (response.success) {
                setGeneratedCode(response.data);
                toast.success('Gift code created successfully!');
                setAmount('');
                setExpiryDate('');
                setMaxRedemptions('');
            }
        } catch (error) {
            console.error('Failed to create gift code', error);
            toast.error('Failed to create gift code');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (generatedCode) {
            navigator.clipboard.writeText(generatedCode.code);
            toast.success('Code copied to clipboard!');
        }
    };

    return (
        <AdminLayout title="Gift Codes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-charcoal mb-6 flex items-center">
                        <HiGift className="w-5 h-5 mr-2 text-gold" />
                        Create New Gift Code
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Amount (₹)
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                placeholder="Enter amount"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date (Optional)
                            </label>
                            <input
                                type="datetime-local"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Redemptions (Optional)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={maxRedemptions}
                                onChange={(e) => setMaxRedemptions(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                                placeholder="Unlimited if empty"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary mt-4"
                        >
                            {loading ? 'Creating...' : 'Generate Code'}
                        </button>
                    </form>
                </div>

                {/* Result Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                    {generatedCode ? (
                        <div className="w-full animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <HiGift className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-charcoal mb-2">Code Generated!</h3>
                            <p className="text-gray-500 mb-6">Share this code with your users.</p>

                            <div className="bg-ivory p-4 rounded-xl border border-dashed border-gray-300 mb-6 relative group">
                                <p className="text-3xl font-mono font-bold text-gold tracking-wider">
                                    {generatedCode.code}
                                </p>
                                <button
                                    onClick={copyToClipboard}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <HiClipboardCopy className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-ivory p-3 rounded-lg">
                                    <p className="text-gray-500">Amount</p>
                                    <p className="font-bold text-charcoal">₹{generatedCode.amount}</p>
                                </div>
                                <div className="bg-ivory p-3 rounded-lg">
                                    <p className="text-gray-500">Max Uses</p>
                                    <p className="font-bold text-charcoal">
                                        {generatedCode.maxRedemptions || 'Unlimited'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400">
                            <div className="w-16 h-16 bg-ivory rounded-full flex items-center justify-center mx-auto mb-4">
                                <HiGift className="w-8 h-8 text-gray-300" />
                            </div>
                            <p>Generate a code to see details here</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminGiftCodes;
