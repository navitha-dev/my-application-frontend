import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.mobileNumber.length !== 10) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const response = await login(formData.mobileNumber, formData.password);

            if (response.success) {
                toast.success('Login successful!');
                // Redirect based on role
                if (response.data.role === 'ADMIN') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/home');
                }
            }
        } catch (error) {
            toast.error(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-ivory p-4">
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
                    <p className="text-charcoal text-lg">Invest in your future.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-obsidian mb-6 text-center">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    placeholder="Enter your password"
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
                            <div className="flex justify-end mt-2">
                                <Link
                                    to="/forgot-password"
                                    className="text-xs text-primary font-medium hover:text-primary-dark transition-colors"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center py-3.5"
                        >
                            {loading ? (
                                <>
                                    <div className="spinner mr-2 border-white border-t-transparent w-5 h-5"></div>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-ash">New to Royal Groww?</span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <Link
                        to="/register"
                        className="block w-full text-center btn-secondary py-3.5"
                    >
                        Create Account
                    </Link>
                </div>

                {/* Footer */}
                <p className="text-center text-ash text-xs mt-8">
                    By logging in, you agree to our Terms & Privacy Policy.
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
