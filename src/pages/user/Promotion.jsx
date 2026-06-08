import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiShare2, FiGift, FiUserPlus, FiDollarSign } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';
import { PromotionSkeleton } from '../../components/Skeletons';

const Promotion = () => {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const referralLink = teamData ? `${window.location.origin}/register?invite=${teamData.referralCode}` : '';

    useEffect(() => {
        fetchTeamData();
    }, []);

    const fetchTeamData = async () => {
        try {
            const response = await apiService.user.getTeam();
            if (response.success) {
                setTeamData(response.data);
            }
        } catch (error) {
            toast.error('Failed to load team data');
        } finally {
            setLoading(false);
        }
    };

    const copyReferralCode = () => {
        navigator.clipboard.writeText(teamData.referralCode);
        toast.success('Referral code copied!');
    };

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success('Referral link copied!');
    };

    const shareReferralLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join Royal Groww',
                    text: `Join Royal Groww and start earning! Use my referral code: ${teamData.referralCode}`,
                    url: referralLink,
                });
            } catch (error) {
                copyReferralLink();
            }
        } else {
            copyReferralLink();
        }
    };

    if (loading) {
        return <PromotionSkeleton />;
    }

    return (
        <div className="min-h-screen bg-ivory pb-24 md:pb-8">
            {/* Hero Section - Groww Style */}
            <div className="bg-white p-8 text-center border-b border-gray-100">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-6 inline-block"
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                        <FiGift className="text-4xl text-primary" />
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-bounce">
                            ₹500
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-obsidian mb-3 font-heading">
                    Refer & Earn <span className="text-primary">₹500</span>
                </h1>
                <p className="text-ash text-lg max-w-md mx-auto">
                    Earn ₹500 for every friend who invests ₹1000 or more.
                </p>
            </div>

            <div className="container-custom mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* How it Works - Simplified */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                    <h3 className="text-lg font-bold text-obsidian mb-6">How it works</h3>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100"></div>

                        <div className="relative flex gap-4 mb-8">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10 flex-shrink-0 shadow-sm">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-obsidian text-sm">Invite your friends</h4>
                                <p className="text-charcoal text-xs mt-1">Share your link or code with your network.</p>
                            </div>
                        </div>

                        <div className="relative flex gap-4 mb-8">
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold z-10 flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="font-bold text-obsidian text-sm">Friend Invests ₹1000+</h4>
                                <p className="text-charcoal text-xs mt-1">They must complete an investment of ₹1000 or more.</p>
                            </div>
                        </div>

                        <div className="relative flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center font-bold z-10 flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="font-bold text-obsidian text-sm">You earn ₹500</h4>
                                <p className="text-charcoal text-xs mt-1">Reward is instantly credited to your wallet.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Referral Code Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#1b1f23] to-[#2c3035] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white/90">Your Referral Code</h3>

                        <div className="bg-white/10 border border-white/10 rounded-xl p-4 flex items-center justify-between mb-6 backdrop-blur-sm">
                            <span className="font-mono text-xl font-bold tracking-widest">{teamData?.referralCode}</span>
                            <button
                                onClick={copyReferralCode}
                                className="text-primary bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            >
                                COPY
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={shareReferralLink}
                            className="bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            <FiShare2 /> Invite Friends
                        </button>
                        <button
                            onClick={copyReferralLink}
                            className="bg-white/10 text-white py-3 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                        >
                            <FiCopy /> Copy Link
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Stats Overview */}
            <div className="container-custom mt-6">
                <h3 className="text-lg font-bold text-obsidian mb-4 px-1">Your Rewards</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-ash mb-1">Total Earnings</p>
                        <p className="text-xl font-bold text-primary">₹{teamData?.totalReferralEarnings || '0'}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-xs text-ash mb-1">Total Referrals</p>
                        <p className="text-xl font-bold text-obsidian">{teamData?.totalDirectReferrals || 0}</p>
                    </div>
                </div>
            </div>

            {/* FAQ / Info Tip */}
            <div className="container-custom mt-8 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                    <div className="mt-1 text-blue-500">
                        <FiUserPlus />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-blue-900">Did you know?</h4>
                        <p className="text-xs text-blue-700/80 mt-1 leading-relaxed">
                            There is no limit to how many friends you can refer. The more you invite, the more you earn!
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Promotion;
