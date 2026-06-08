import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGift, FiInfo } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const GiftCode = () => {
    const [code, setCode] = useState('');
    const [redeeming, setRedeeming] = useState(false);
    const navigate = useNavigate();

    const handleRedeem = async () => {
        if (!code.trim()) {
            toast.error('Please enter a gift code');
            return;
        }

        setRedeeming(true);
        try {
            const response = await apiService.giftCode.redeemGiftCode(code.trim().toUpperCase());
            if (response.success) {
                toast.success(response.message);
                setCode('');
                // Redirect to home after successful redemption
                setTimeout(() => navigate('/home'), 1500);
            }
        } catch (error) {
            toast.error(error.message || 'Invalid or expired gift code');
        } finally {
            setRedeeming(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory">
            <div className="gradient-gold p-6 text-obsidian">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-lg mr-3">
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Redeem Gift Code</h1>
                        <p className="text-sm text-obsidian/80">Enter promotional code</p>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6 space-y-6">
                {/* Gift Card */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="card-premium p-8 text-center"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center">
                        <FiGift size={48} className="text-obsidian" />
                    </div>

                    <h2 className="text-2xl font-bold text-obsidian mb-2">Got a Gift Code?</h2>
                    <p className="text-ash mb-6">Redeem it and get instant rewards!</p>

                    <div className="space-y-4">
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="Enter Gift Code"
                            className="input-primary text-center text-2xl font-mono tracking-widest"
                            maxLength={12}
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRedeem}
                            disabled={redeeming || !code.trim()}
                            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {redeeming ? (
                                <>
                                    <div className="spinner mr-2"></div>
                                    Redeeming...
                                </>
                            ) : (
                                'Redeem Now'
                            )}
                        </motion.button>
                    </div>
                </motion.div>

                {/* How it Works */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <h3 className="font-semibold text-obsidian mb-4">How Gift Codes Work</h3>

                    <div className="space-y-3">
                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-bold mr-3 flex-shrink-0">
                                1
                            </div>
                            <div>
                                <p className="font-semibold text-obsidian">Get a Code</p>
                                <p className="text-sm text-ash">Receive gift codes from promotions or events</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-bold mr-3 flex-shrink-0">
                                2
                            </div>
                            <div>
                                <p className="font-semibold text-obsidian">Enter Code</p>
                                <p className="text-sm text-ash">Type the code exactly as provided</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-bold mr-3 flex-shrink-0">
                                3
                            </div>
                            <div>
                                <p className="font-semibold text-obsidian">Get Rewards</p>
                                <p className="text-sm text-ash">Amount credited instantly to your wallet</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card p-4 bg-blue-50"
                >
                    <p className="text-sm text-ash text-center flex items-center justify-center gap-2">
                        <FiInfo className="text-blue-500 flex-shrink-0" size={16} /> Gift codes are case-insensitive and can only be used once
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default GiftCode;
