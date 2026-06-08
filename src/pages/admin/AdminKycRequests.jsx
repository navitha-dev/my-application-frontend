import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FiCheckCircle, FiXCircle, FiEye, FiSearch, FiRefreshCcw, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { TableSkeleton } from '../../components/Skeletons';
import apiService from '../../api/apiService';

const AdminKycRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await apiService.admin.getPendingKycRequests();
            if (response.success) {
                setRequests(response.data);
            }
        } catch (error) {
            toast.error('Failed to load validation requests');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (userId, approve) => {
        setProcessing(true);
        try {
            const response = await apiService.admin.verifyKyc(userId, approve, approve ? '' : rejectionReason);
            if (response.success) {
                toast.success(approve ? 'KYC Approved' : 'KYC Rejected');
                setRequests(prev => prev.filter(r => r.id !== userId));
                setSelectedRequest(null);
                setRejectionReason('');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Action failed');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <AdminLayout title="KYC Requests">
            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">Review and approve user identity documents</p>
                <button
                    onClick={fetchRequests}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
                    title="Refresh List"
                >
                    <FiRefreshCcw />
                </button>
            </div>

            {loading ? (
                <TableSkeleton rows={5} />
            ) : requests.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiShield className="text-gray-300" size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-700">All Caught Up!</h3>
                    <p className="text-gray-500 mt-2">No pending KYC requests found.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-ivory border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">User Details</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">ID Number</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Submitted On</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.map(req => (
                                    <tr key={req.id} className="hover:bg-ivory transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-charcoal">{req.fullName}</div>
                                            <div className="text-xs text-gray-500">{req.mobileNumber}</div>
                                            <div className="text-xs text-gray-400">{req.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                                                {req.kycIdNumber}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {req.updatedAt ? new Date(req.updatedAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedRequest(req)}
                                                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                                            >
                                                <FiEye className="mr-2" /> Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            <AnimatePresence>
                {selectedRequest && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <div>
                                    <h3 className="font-bold text-xl text-charcoal">Review Document</h3>
                                    <p className="text-sm text-gray-500">Verify user identity details</p>
                                </div>
                                <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                    <FiXCircle size={24} className="text-gray-400 hover:text-gray-600" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Applicant Details</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs text-gray-500">Full Name</label>
                                                <p className="font-bold text-lg text-charcoal">{selectedRequest.fullName}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Mobile Number</label>
                                                <p className="font-medium text-charcoal">{selectedRequest.mobileNumber}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Email Address</label>
                                                <p className="font-medium text-charcoal">{selectedRequest.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Document Details</h4>
                                        <div>
                                            <label className="text-xs text-gray-500">ID Number (Aadhaar/PAN)</label>
                                            <p className="font-bold text-xl font-mono text-charcoal tracking-wide">{selectedRequest.kycIdNumber}</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-50">
                                            <label className="text-xs text-gray-500 block mb-2">Verification Action</label>
                                            <div className="flex gap-2 text-xs">
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md font-medium">Pending Review</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">ID Proof Image</h4>
                                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm flex items-center justify-center min-h-[300px]">
                                        {selectedRequest.kycImageUrl ? (
                                            <img
                                                src={selectedRequest.kycImageUrl}
                                                alt="ID Proof"
                                                className="max-w-full max-h-[500px] object-contain rounded-lg"
                                            />
                                        ) : (
                                            <div className="text-center text-gray-400">
                                                <FiShield size={48} className="mx-auto mb-2 opacity-20" />
                                                <p>No Image Data Available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 bg-white grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleVerify(selectedRequest.id, false)}
                                    disabled={processing}
                                    className="py-4 px-6 border border-red-200 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <FiXCircle /> Reject Application
                                </button>
                                <button
                                    onClick={() => handleVerify(selectedRequest.id, true)}
                                    disabled={processing}
                                    className="py-4 px-6 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <FiCheckCircle /> Approve & Verify
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AdminLayout>
    );
};

export default AdminKycRequests;
