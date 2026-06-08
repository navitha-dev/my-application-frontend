import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUploadCloud, FiCheckCircle, FiClock, FiAlertCircle, FiShield, FiLock, FiServer } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const KycVerification = () => {
    const navigate = useNavigate();
    const { user: authUser, refreshUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form
    const [idNumber, setIdNumber] = useState('');
    const [idImage, setIdImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await apiService.user.getProfile();
            if (response.success) {
                setUser(response.data);
                // Pre-fill if needed
                if (response.data.kycStatus === 'REJECTED') {
                    // toast.error('Your previous KYC was rejected. Please resubmit.');
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
            };
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const resized = await resizeImage(file);
                setIdImage(resized);
                setPreviewUrl(resized);
            } catch (err) {
                toast.error('Failed to process image');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!idNumber || !idImage) {
            toast.error('Please enter ID number and upload document image');
            return;
        }

        setSubmitting(true);
        try {
            // Send Base64 directly
            const response = await apiService.kyc.submitKyc({
                idNumber,
                imageUrl: idImage // In production, upload to S3 first and send URL
            });

            if (response.success) {
                toast.success('KYC Submitted Successfully');
                refreshUser(); // Update global context
                fetchUserProfile(); // Refresh local state
            }
        } catch (error) {
            toast.error(error.message || 'Failed to submit KYC');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
        );
    }

    const renderContent = () => {
        switch (user?.kycStatus) {
            case 'VERIFIED':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCheckCircle className="text-green-500" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-obsidian mb-2">KYC Verified</h2>
                        <p className="text-gray-500 mb-6">Your identity has been verified. You can now enjoy full access to withdrawals and higher limits.</p>
                        <button onClick={() => navigate('/home')} className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors">
                            Go to Dashboard
                        </button>
                    </motion.div>
                );

            case 'SUBMITTED':
                return (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiClock className="text-yellow-500" size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-obsidian mb-2">Under Review</h2>
                        <p className="text-gray-500 mb-6">Your documents have been submitted and are currently under review. This usually takes 24-48 hours.</p>
                        <button onClick={() => navigate('/home')} className="px-8 py-3 bg-gray-100 text-charcoal rounded-xl font-bold hover:bg-gray-200 transition-colors">
                            Back to Home
                        </button>
                    </motion.div>
                );

            case 'REJECTED':
            case 'PENDING':
            default:
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl shadow-lg p-6">
                        {user?.kycStatus === 'REJECTED' && (
                            <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 flex items-start gap-3">
                                <FiAlertCircle className="text-red-500 mt-1" size={20} />
                                <div>
                                    <p className="text-red-700 font-bold">KYC Rejected</p>
                                    <p className="text-sm text-red-600">Please re-upload clear documents matching your profile details.</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-gold/10 p-3 rounded-full">
                                <FiShield className="text-gold" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-obsidian">Identity Verification</h2>
                                <p className="text-sm text-gray-500">Government issued ID (Aadhaar/PAN)</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">ID Number</label>
                                <input
                                    type="text"
                                    value={idNumber}
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    placeholder="Enter Aadhaar or PAN Number"
                                    className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-gold outline-none font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-charcoal mb-2">Upload Document</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gold transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {previewUrl ? (
                                        <div className="relative h-48 w-full">
                                            <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                <p className="text-white font-bold">Change Image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-8">
                                            <FiUploadCloud className="mx-auto text-gray-400 mb-3" size={48} />
                                            <p className="text-gray-600 font-medium">Click to upload ID Card</p>
                                            <p className="text-xs text-gray-400 mt-1">Updates Allowed: JPG, PNG (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-gold text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                            >
                                {submitting ? 'Submitting...' : 'Submit Verification'}
                            </button>
                        </form>

                        {/* Trust Signals */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <h3 className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Why Trust Us?</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="text-center p-2">
                                    <FiLock className="mx-auto text-green-600 mb-2" size={20} />
                                    <p className="text-[10px] text-gray-500 font-medium">256-bit Encryption</p>
                                </div>
                                <div className="text-center p-2">
                                    <FiShield className="mx-auto text-blue-600 mb-2" size={20} />
                                    <p className="text-[10px] text-gray-500 font-medium">Strict Privacy Policy</p>
                                </div>
                                <div className="text-center p-2">
                                    <FiServer className="mx-auto text-purple-600 mb-2" size={20} />
                                    <p className="text-[10px] text-gray-500 font-medium">Secure Data Storage</p>
                                </div>
                            </div>
                            <p className="text-center text-[10px] text-gray-400 mt-4 px-4 leading-relaxed">
                                Your ID is only used for government-mandated identity verification. We use bank-grade encryption and never share your data with unauthorized third parties.
                            </p>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-obsidian p-6 text-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">KYC Verification</h1>
                </div>
            </div>

            <div className="container-custom px-4 mt-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default KycVerification;
