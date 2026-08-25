import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify & Reset
    const [formData, setFormData] = useState({
        email: '',
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
        if (e && e.preventDefault) e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email.trim())) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.sendOtp(formData.email.trim(), 'PASSWORD_RESET');
            if (response.success) {
                console.log('--- OTP DISPATCH ---');
                console.log(`OTP received: ${response.otp}`);
                console.log('--------------------');
                if (response.otp) {
                    setFormData(prev => ({ ...prev, otp: response.otp }));
                    toast.success(`OTP sent! Your verification code is: ${response.otp}`, { duration: 8000 });
                } else {
                    toast.success(`OTP sent to ${formData.email.trim()}. Please check your inbox or spam.`);
                }
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
                email: formData.email.trim(),
                otp: formData.otp.trim(),
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
                                <label htmlFor="email" className="block text-sm font-medium text-obsidian mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter registered email address"
                                        className="input-primary pl-12"
                                        required
                                        autocomplete="email"
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
                            {/* Hidden username field for accessibility and password managers */}
                            <input
                                type="text"
                                name="username"
                                value={formData.email}
                                autoComplete="username"
                                readOnly
                                style={{ display: 'none' }}
                            />
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
                                        autocomplete="one-time-code"
                                    />
                                </div>
                                <p className="text-xs text-ash mt-2 text-center">
                                    OTP sent to {formData.email}
                                </p>
                            </div>

                            {/* Resend OTP */}
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="text-gold hover:text-gold-dark text-sm font-medium"
                                >
                                    Resend OTP
                                </button>
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
                                        autocomplete="new-password"
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
                                        autocomplete="new-password"
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
