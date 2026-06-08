import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';
import { WithdrawSkeleton } from '../../components/Skeletons';

const Withdraw = () => {
    const [amount, setAmount] = useState('');
    const [walletBalance, setWalletBalance] = useState(0);
    const [bankDetails, setBankDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [isFeeWaived, setIsFeeWaived] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [walletResponse, bankResponse] = await Promise.all([
                apiService.user.getWallet(),
                apiService.bank.getBankDetails()
            ]);

            if (walletResponse.success) {
                setWalletBalance(walletResponse.data.walletBalance);
                setIsFeeWaived(walletResponse.data.isWithdrawalFeeWaived || false);
            }

            if (bankResponse.success && bankResponse.data) {
                setBankDetails(bankResponse.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setFetchingData(false);
        }
    };

    const handleWithdraw = async () => {
        if (!amount || parseFloat(amount) < 100) {
            toast.error('Minimum withdrawal amount is ₹100');
            return;
        }

        if (parseFloat(amount) > walletBalance) {
            toast.error('Insufficient wallet balance');
            return;
        }

        if (!bankDetails) {
            toast.error('Please add bank details first');
            navigate('/bank');
            return;
        }

        if (bankDetails.verificationStatus !== 'APPROVED') {
            toast.error('Bank details not verified. Please wait for admin approval.');
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.wallet.requestWithdrawal(parseFloat(amount));
            if (response.success) {
                toast.success('Withdrawal requested! Approval takes 24 hours.');
                navigate('/records');
            }
        } catch (error) {
            toast.error(error.message || 'Withdrawal request failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return <WithdrawSkeleton />;
    }

    return (
        <div className="min-h-screen bg-ivory">
            {/* Header */}
            <div className="gradient-gold p-6 text-obsidian">
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors mr-3"
                    >
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Withdraw Funds</h1>
                        <p className="text-sm text-obsidian/80">Transfer to your bank account</p>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6 space-y-6">
                {/* Available Balance */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="card-premium p-6"
                >
                    <p className="text-sm text-ash mb-2">Available Balance</p>
                    <p className="text-4xl font-bold text-gold">₹{walletBalance}</p>
                </motion.div>

                {/* Bank Details Status */}
                {!bankDetails ? (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="card p-4 bg-orange-50 border-orange-200"
                    >
                        <div className="flex items-start">
                            <FiAlertCircle className="text-orange-600 mt-1 mr-3" size={20} />
                            <div className="flex-1">
                                <p className="font-semibold text-obsidian mb-1">No Bank Details Found</p>
                                <p className="text-sm text-ash mb-3">Please add your bank account to withdraw funds</p>
                                <button
                                    onClick={() => navigate('/bank')}
                                    className="btn-primary text-sm py-2"
                                >
                                    Add Bank Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : bankDetails.verificationStatus === 'PENDING' ? (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="card p-4 bg-yellow-50 border-yellow-200"
                    >
                        <div className="flex items-start">
                            <FiAlertCircle className="text-yellow-600 mt-1 mr-3" size={20} />
                            <div>
                                <p className="font-semibold text-obsidian mb-1">Verification Pending</p>
                                <p className="text-sm text-ash">Your bank details are awaiting admin verification</p>
                            </div>
                        </div>
                    </motion.div>
                ) : bankDetails.verificationStatus === 'REJECTED' ? (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="card p-4 bg-red-50 border-red-200"
                    >
                        <div className="flex items-start">
                            <FiAlertCircle className="text-red-600 mt-1 mr-3" size={20} />
                            <div className="flex-1">
                                <p className="font-semibold text-obsidian mb-1">Bank Details Rejected</p>
                                <p className="text-sm text-ash mb-1">Reason: {bankDetails.adminRemarks || 'Please update your details'}</p>
                                <button
                                    onClick={() => navigate('/bank')}
                                    className="btn-primary text-sm py-2 mt-2"
                                >
                                    Update Bank Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="card p-4"
                    >
                        <p className="text-sm text-ash mb-2">Withdrawal Account</p>
                        <p className="font-semibold text-obsidian">{bankDetails.accountHolderName}</p>
                        <p className="text-sm text-ash">{bankDetails.bankName}</p>
                        <p className="text-sm font-mono text-obsidian">**** **** {bankDetails.accountNumber.slice(-4)}</p>
                        <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            <FiCheckCircle size={12} /> Verified
                        </span>
                    </motion.div>
                )}

                {/* Withdrawal Amount */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <h3 className="font-semibold text-obsidian mb-4">Select Amount</h3>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {[100, 500, 1000, 2000, 5000, 10000].map((preset) => (
                            <motion.button
                                key={preset}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setAmount(preset.toString())}
                                className={`p-4 rounded-xl border-2 font-semibold transition-all shadow-sm ${amount === preset.toString()
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-200 text-obsidian hover:border-primary'
                                    } ${preset > walletBalance ? 'opacity-40 cursor-not-allowed' : ''}`}
                                disabled={preset > walletBalance}
                            >
                                ₹{preset}
                            </motion.button>
                        ))}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-obsidian">
                                Or Enter Custom Amount
                            </label>
                            <button
                                type="button"
                                onClick={() => setAmount(walletBalance.toString())}
                                className="text-primary text-sm font-bold hover:underline"
                                disabled={walletBalance === 0}
                            >
                                Withdraw All
                            </button>
                        </div>
                        <div className="relative mt-2">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-bold text-obsidian">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Minimum 100"
                                className="input-primary text-xl font-bold pl-12"
                                min="100"
                                max={walletBalance}
                            />
                        </div>
                    </div>

                    {/* Withdrawal Summary */}
                    {amount && !isNaN(amount) && parseFloat(amount) > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-100 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Requested Amount</span>
                                <span className="font-semibold text-obsidian">₹{amount}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span className="text-obsidian">Net Receive</span>
                                <span className="text-green-600">
                                    ₹{parseFloat(amount).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Important Notes */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card p-4 bg-blue-50"
                >
                    <h4 className="font-semibold text-obsidian mb-2">Important Notes:</h4>
                    <ul className="text-sm text-ash space-y-1">
                        <li>• Minimum withdrawal: ₹100</li>
                        <li>• Processing time: 24 hours</li>
                    </ul>
                </motion.div>

                {/* Withdraw Button */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWithdraw}
                    disabled={loading || !amount || !bankDetails || bankDetails.verificationStatus !== 'APPROVED'}
                    className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="spinner mr-2"></div>
                            Processing...
                        </>
                    ) : (
                        `Request Withdrawal ₹${amount || '0'}`
                    )}
                </motion.button>
            </div>
        </div >
    );
};

export default Withdraw;
