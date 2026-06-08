import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../api/authService';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiLock, FiEye, FiEyeOff, FiGift } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
    const [searchParams] = useSearchParams();
    const referralCodeFromUrl = searchParams.get('invite') || '';

    const [step, setStep] = useState(1); // 1: Form, 2: OTP
    const [otpSent, setOtpSent] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        mobileNumber: '',
        email: '',
        otp: '',
        password: '',
        confirmPassword: '',
        referralCode: referralCodeFromUrl,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendOtp = async () => {
        if (formData.mobileNumber.length !== 10) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.sendOtp(formData.mobileNumber, 'REGISTRATION');

            if (response.success) {
                toast.success('OTP sent to your mobile number');
                setOtpSent(true);
                setStep(2);
            }
        } catch (error) {
            toast.error(error.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (formData.otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const registerData = {
                fullName: formData.fullName,
                mobileNumber: formData.mobileNumber,
                email: formData.email,
                otp: formData.otp,
                password: formData.password,
                referralCode: formData.referralCode || null,
            };

            const response = await register(registerData);

            if (response.success) {
                toast.success('Registration successful! Welcome to Royal Groww!');
                navigate('/home');
            }
        } catch (error) {
            toast.error(error.message || 'Registration failed');
            if (error.message.includes('OTP')) {
                setStep(2);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ivory p-4 py-8">
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
                        className="text-4xl font-bold font-heading text-obsidian tracking-tight mb-2"
                    >
                        Royal<span className="text-primary">Groww</span>
                    </motion.h1>
                    <p className="text-charcoal text-lg">Start your investment journey.</p>
                </div>

                {/* Registration Card */}
                <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-obsidian mb-6 text-center">Create Account</h2>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8">
                        <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-300'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'} font-semibold transition-colors duration-300`}>
                                1
                            </div>
                            <span className="ml-2 text-sm font-medium">Details</span>
                        </div>
                        <div className={`w-16 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-gray-100'}`}></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-300'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'} font-semibold transition-colors duration-300`}>
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium">Verify</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <>
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-charcoal mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="input-primary pl-12"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div>
                                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-charcoal mb-2">
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            placeholder="Enter 10-digit mobile number"
                                            maxLength="10"
                                            className="input-primary pl-12"
                                            required
                                            disabled={otpSent}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="input-primary pl-12"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password (min 6 characters)"
                                            className="input-primary pl-12 pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter your password"
                                            className="input-primary pl-12"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Referral Code (Optional) */}
                                <div>
                                    <label htmlFor="referralCode" className="block text-sm font-medium text-charcoal mb-2">
                                        Referral Code (Optional)
                                    </label>
                                    <div className="relative">
                                        <FiGift className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                                        <input
                                            type="text"
                                            id="referralCode"
                                            name="referralCode"
                                            value={formData.referralCode}
                                            onChange={handleChange}
                                            placeholder="Enter referral code"
                                            className="input-primary pl-12"
                                        />
                                    </div>
                                </div>

                                {/* Send OTP Button */}
                                {!otpSent && (
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="w-full btn-primary py-3.5 mt-4"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="spinner mr-2 border-white border-t-transparent w-5 h-5"></div>
                                                Sending OTP...
                                            </>
                                        ) : (
                                            'Send OTP'
                                        )}
                                    </button>
                                )}
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* OTP Input */}
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-charcoal mb-2">
                                        Enter OTP
                                    </label>
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength="6"
                                        className="input-primary text-center text-2xl tracking-widest font-bold"
                                        required
                                    />
                                    <p className="text-sm text-ash mt-2 text-center">
                                        OTP sent to {formData.mobileNumber}
                                    </p>
                                </div>

                                {/* Resend OTP */}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        className="text-primary hover:text-primary-dark text-sm font-medium"
                                    >
                                        Resend OTP
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary py-3.5"
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner mr-2 border-white border-t-transparent w-5 h-5"></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>

                                {/* Back Button */}
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full btn-secondary py-3.5"
                                >
                                    Back to Form
                                </button>
                            </>
                        )}
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-ash">Already have an account?</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <Link
                        to="/login"
                        className="block w-full text-center btn-secondary py-3.5"
                    >
                        Login
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-ash text-xs mt-8">
                    By registering, you agree to our Terms & Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
