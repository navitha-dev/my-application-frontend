import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const Recharge = () => {
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const presetAmounts = [100, 500, 1000, 2000, 5000, 10000];

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment') === 'failed') {
            const reason = params.get('reason');
            toast.error(reason === 'hash_mismatch' ? 'Payment verification failed (signature mismatch).' : 'Payment failed. Please try again.');
            // Clear URL params
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const handleRecharge = async () => {
        const rechargeAmount = amount || customAmount;

        if (!rechargeAmount || parseFloat(rechargeAmount) < 100) {
            toast.error('Minimum deposit amount is ₹100');
            return;
        }

        setLoading(true);
        try {
            const response = await apiService.wallet.initiateRecharge(
                parseFloat(rechargeAmount),
                'UPI'
            );

            if (response.success) {
                const { data } = response;

                // Create a dynamic HTML form and submit it to redirect to PayU
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = data.payuUrl;

                const fields = {
                    key: data.key,
                    txnid: data.txnid,
                    amount: data.amount,
                    productinfo: data.productinfo,
                    firstname: data.firstname,
                    email: data.email,
                    phone: data.phone,
                    surl: data.surl,
                    furl: data.furl,
                    hash: data.hash,
                    service_provider: 'payu_paisa'
                };

                for (const key in fields) {
                    if (fields.hasOwnProperty(key)) {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = fields[key];
                        form.appendChild(input);
                    }
                }

                document.body.appendChild(form);
                form.submit();
            } else {
                toast.error(response.message || 'Failed to initiate deposit');
            }
        } catch (error) {
            toast.error(error.message || 'Deposit failed');
        } finally {
            setLoading(false);
        }
    };


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
                        <h1 className="text-2xl font-bold font-heading">Deposit Wallet</h1>
                        <p className="text-sm text-obsidian/80">Add funds to your wallet</p>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6 space-y-6">
                {/* Amount Selection */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="card p-6"
                >
                    <h3 className="font-semibold text-obsidian mb-4">Select Amount</h3>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {presetAmounts.map((preset) => (
                            <motion.button
                                key={preset}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setAmount(preset.toString());
                                    setCustomAmount('');
                                }}
                                className={`p-4 rounded-lg border-2 font-semibold transition-all ${amount === preset.toString()
                                    ? 'border-gold bg-gold text-obsidian'
                                    : 'border-ash/20 text-obsidian hover:border-gold'
                                    }`}
                            >
                                ₹{preset}
                            </motion.button>
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-obsidian mb-2">
                            Or Enter Custom Amount
                        </label>
                        <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setAmount('');
                            }}
                            placeholder="Enter amount (min ₹100)"
                            className="input-primary"
                            min="100"
                        />
                    </div>
                </motion.div>

                {/* Payment Summary */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card-premium p-6"
                >
                    <h3 className="font-semibold text-obsidian mb-4">Payment Summary</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-ash">Deposit Amount</span>
                            <span className="font-bold text-obsidian">
                                ₹{amount || customAmount || '0'}
                            </span>
                        </div>
                        <div className="border-t border-ash/20 pt-3 flex justify-between">
                            <span className="font-semibold text-obsidian">Total Payable</span>
                            <span className="text-2xl font-bold text-gold">
                                ₹{parseFloat(amount || customAmount || '0').toFixed(2)}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                >
                    <h3 className="font-semibold text-obsidian mb-4">Payment Method</h3>

                    <div className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-300">
                            <div className="flex items-center">
                                <FiCreditCard size={24} className="text-blue-600 mr-3" />
                                <div className="flex-1">
                                    <p className="font-semibold text-obsidian">UPI / Cards / Net Banking</p>
                                    <p className="text-xs text-ash">Powered by PayU</p>
                                </div>
                                <div className="w-4 h-4 rounded-full border-2 border-blue-600 bg-blue-600"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 p-4 bg-gold/10 rounded-lg">
                        <p className="text-sm text-ash text-center flex items-center justify-center gap-2">
                            <FiLock className="text-green-600 flex-shrink-0" size={16} /> 100% Secure Payment Gateway
                        </p>
                    </div>
                </motion.div>

                {/* Recharge Button */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRecharge}
                    disabled={loading || (!amount && !customAmount)}
                    className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="spinner mr-2"></div>
                            Processing...
                        </>
                    ) : (
                        `Proceed to Pay ₹${parseFloat(amount || customAmount || '0').toFixed(2)}`
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default Recharge;
