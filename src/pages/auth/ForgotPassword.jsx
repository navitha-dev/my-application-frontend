import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { motion } from 'framer-motion';
import { FiPhone, FiLock, FiEye, FiEyeOff, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify & Reset
    const [formData, setFormData] = useState({
        mobileNumber: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (formData.mobileNumber.length !== 10) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.sendOtp(formData.mobileNumber, 'PASSWORD_RESET');
            if (response.success) {
                toast.success('OTP sent successfully!');
                setOtpSent(true);
                setStep(2);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (formData.otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.resetPassword({
                mobileNumber: formData.mobileNumber,
                otp: formData.otp,
                newPassword: formData.newPassword
            });

            if (response.success) {
                toast.success('Password reset successful! Please login.');
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message || 'Password reset failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pearl via-ivory to-champagne p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <motion.h1
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="heading-primary gradient-gold bg-clip-text text-transparent mb-2"
                    >
                        Royal Groww
                    </motion.h1>
                    <p className="text-ash text-lg">Reset Password</p>
                </div>

                {/* Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-2xl p-8 border border-gold/20"
                >
                    {step === 1 ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div>
                                <label htmlFor="mobileNumber" className="block text-sm font-medium text-obsidian mb-2">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                                    <input
                                        type="tel"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        placeholder="Enter registered mobile number"
                                        maxLength="10"
                                        className="input-primary pl-12"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner mr-2"></div>
                                        Sending OTP...
                                    </>
                                ) : (
                                    'Send OTP'
                                )}
                            </motion.button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            {/* OTP */}
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-obsidian mb-2">
                                    Enter OTP
                                </label>
                                <div className="relative">
                                    <FiMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength="6"
                                        className="input-primary pl-12"
                                        required
                                    />
                                </div>
                            </div>

                            {/* New Password */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-obsidian mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="newPassword"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        className="input-primary pl-12 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-gold transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-obsidian mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                        className="input-primary pl-12"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <div className="spinner mr-2"></div>
                                        Resetting Password...
                                    </>
                                ) : (
                                    'Reset Password'
                                )}
                            </motion.button>
                        </form>
                    )}

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-gold hover:text-gold-dark transition-colors text-sm font-medium"
                        >
                            Back to Login
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
