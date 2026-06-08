import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const BankDetails = () => {
    const [bankDetails, setBankDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        branchName: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBankDetails();
    }, []);

    const fetchBankDetails = async () => {
        try {
            const response = await apiService.bank.getBankDetails();
            if (response.success && response.data) {
                setBankDetails(response.data);
                setFormData({
                    accountHolderName: response.data.accountHolderName || '',
                    accountNumber: response.data.accountNumber || '',
                    ifscCode: response.data.ifscCode || '',
                    bankName: response.data.bankName || '',
                    branchName: response.data.branchName || '',
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await apiService.bank.saveBankDetails(formData);
            if (response.success) {
                toast.success(response.message);
                navigate('/profile');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to save bank details');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory pb-6">
            <div className="gradient-gold p-6 text-obsidian">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-lg mr-3">
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold font-heading">Bank Details</h1>
                        <p className="text-sm text-obsidian/80">Manage withdrawal account</p>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-6">
                {bankDetails && (
                    <div className="card p-4 mb-4 bg-blue-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-ash">Verification Status</p>
                                <p className={`font-semibold ${bankDetails.verificationStatus === 'APPROVED' ? 'text-green-600' :
                                        bankDetails.verificationStatus === 'REJECTED' ? 'text-red-600' :
                                            'text-yellow-600'
                                    }`}>
                                    {bankDetails.verificationStatus}
                                </p>
                            </div>
                            {bankDetails.verificationStatus === 'APPROVED' && (
                                <FiCheck size={32} className="text-green-600" />
                            )}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-obsidian mb-2">Account Holder Name</label>
                        <input
                            type="text"
                            value={formData.accountHolderName}
                            onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                            className="input-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-obsidian mb-2">Account Number</label>
                        <input
                            type="text"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            className="input-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-obsidian mb-2">IFSC Code</label>
                        <input
                            type="text"
                            value={formData.ifscCode}
                            onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                            className="input-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-obsidian mb-2">Bank Name</label>
                        <input
                            type="text"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                            className="input-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-obsidian mb-2">Branch Name</label>
                        <input
                            type="text"
                            value={formData.branchName}
                            onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                            className="input-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary"
                    >
                        {submitting ? 'Saving...' : 'Save Bank Details'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BankDetails;
