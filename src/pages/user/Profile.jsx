import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiHome, FiShoppingBag, FiUsers, FiUser, FiEdit2, FiMail, FiPhone,
    FiCreditCard, FiLogOut, FiChevronRight, FiSettings, FiHelpCircle, FiShield, FiAlertTriangle, FiInfo
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';
import { ProfileSkeleton } from '../../components/Skeletons';

const Profile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await apiService.user.getProfile();
            if (response.success) {
                setProfile(response.data);
                setFormData({
                    fullName: response.data.fullName,
                    email: response.data.email,
                });
            }
        } catch (error) {
            toast.error('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const response = await apiService.user.updateProfile(formData.fullName, formData.email);
            if (response.success) {
                toast.success('Profile updated successfully');
                setProfile(response.data);
                setEditing(false);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="min-h-screen bg-ivory">
            {/* Header - Using white bg to match dashboard */}
            <div className="bg-white p-6 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold font-heading text-obsidian">Account</h1>
                    <p className="text-xs text-charcoal">Manage your profile</p>
                </div>
                <button
                    onClick={() => setEditing(!editing)}
                    className="p-2 bg-gray-50 rounded-full text-primary hover:bg-primary/10 transition-colors"
                >
                    <FiEdit2 size={18} />
                </button>
            </div>

            <div className="container-custom mt-6 space-y-6 px-4">
                {/* Profile Info Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-xl shadow-card border border-gray-100 p-6"
                >
                    <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mr-4">
                            {profile?.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            {editing ? (
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="input-primary mb-2"
                                    placeholder="Full Name"
                                />
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold text-obsidian">{profile?.fullName}</h2>
                                    <p className="text-sm text-ash">ID: {profile?.userId}</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FiPhone className="text-primary mr-3" size={20} />
                            <div className="flex-1">
                                <p className="text-xs text-ash">Mobile Number</p>
                                <p className="font-semibold text-obsidian">{profile?.mobileNumber}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <FiMail className="text-primary mr-3" size={20} />
                            <div className="flex-1">
                                <p className="text-xs text-ash">Email Address</p>
                                {editing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="input-primary mt-1"
                                        placeholder="Email"
                                    />
                                ) : (
                                    <p className="font-semibold text-obsidian">{profile?.email}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {editing && (
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setEditing(false)}
                                className="flex-1 btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="flex-1 btn-primary"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* KYC Status Badge */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                >
                    {profile?.kycStatus === 'VERIFIED' ? (
                        <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <FiShield size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-green-800">KYC Verified</p>
                                    <p className="text-xs text-green-600">Account limits removed</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/kyc">
                            <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-center justify-between hover:bg-orange-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                        <FiAlertTriangle size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-orange-800">Verify Your Account</p>
                                        <p className="text-xs text-orange-600">Complete KYC to withdraw funds</p>
                                    </div>
                                </div>
                                <FiChevronRight className="text-orange-400" />
                            </div>
                        </Link>
                    )}
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="card p-4 text-center">
                        <p className="text-sm text-ash mb-1">Total Investment</p>
                        <p className="text-2xl font-bold text-primary">₹{profile?.totalInvestment || '0'}</p>
                    </div>
                    <div className="card p-4 text-center">
                        <p className="text-sm text-ash mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold text-green-600">₹{profile?.totalEarnings || '0'}</p>
                    </div>
                </motion.div>

                {/* Menu Items */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="card p-4 space-y-1"
                >
                    <Link to="/bank" className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-2 bg-primary/10 rounded-lg mr-3">
                            <FiCreditCard size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-obsidian">Bank Details</p>
                            <p className="text-xs text-ash">Manage withdrawal account</p>
                        </div>
                        <FiChevronRight className="text-ash" />
                    </Link>

                    <Link to="/subscriptions" className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-2 bg-blue-50 rounded-lg mr-3">
                            <FiShoppingBag size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-obsidian">My Investments</p>
                            <p className="text-xs text-ash">View all subscriptions</p>
                        </div>
                        <FiChevronRight className="text-ash" />
                    </Link>

                    <Link to="/records" className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-2 bg-green-50 rounded-lg mr-3">
                            <FiSettings size={20} className="text-green-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-obsidian">Transaction Records</p>
                            <p className="text-xs text-ash">View history</p>
                        </div>
                        <FiChevronRight className="text-ash" />
                    </Link>

                    <Link to="/about" className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-2 bg-purple-50 rounded-lg mr-3">
                            <FiInfo size={20} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-obsidian">About Royal Groww</p>
                            <p className="text-xs text-ash">Company info & Legal</p>
                        </div>
                        <FiChevronRight className="text-ash" />
                    </Link>

                    <Link to="/support" className="w-full flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="p-2 bg-purple-50 rounded-lg mr-3">
                            <FiHelpCircle size={20} className="text-purple-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="font-semibold text-obsidian">Help & Support</p>
                            <p className="text-xs text-ash">Get assistance 24/7</p>
                        </div>
                        <FiChevronRight className="text-ash" />
                    </Link>
                </motion.div>

                {/* Logout Button */}
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full btn-outline text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-700 flex items-center justify-center"
                >
                    <FiLogOut className="mr-2" />
                    Logout
                </motion.button>
            </div>
        </div>
    );
};

export default Profile;
