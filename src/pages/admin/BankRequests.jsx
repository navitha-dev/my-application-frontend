import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import apiService from '../../api/apiService';
import { toast } from 'react-hot-toast';
import { TableSkeleton } from '../../components/Skeletons';

const AdminBankRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await apiService.admin.getPendingBankDetails();
            if (response.success) {
                setRequests(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch bank requests', error);
            toast.error('Failed to load bank requests');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id, status) => {
        try {
            const remarks = status === 'APPROVED' ? 'Verified by Admin' : 'Rejected by Admin';
            await apiService.admin.verifyBankDetails(id, status, remarks);
            toast.success(`Bank details ${status.toLowerCase()}`);
            fetchRequests(); // Refresh list
        } catch (error) {
            console.error('Failed to verify bank details', error);
            toast.error('Failed to update status');
        }
    };

    return (
        <AdminLayout title="Bank Verification Requests">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <TableSkeleton rows={5} />
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-ivory text-gray-600 text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 font-medium">User ID</th>
                                    <th className="px-6 py-3 font-medium">Account Holder</th>
                                    <th className="px-6 py-3 font-medium">Bank Details</th>
                                    <th className="px-6 py-3 font-medium">IFSC</th>
                                    <th className="px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                            No pending requests
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((request) => (
                                        <tr key={request.id} className="hover:bg-ivory transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {request.user ? request.user.id : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-charcoal">{request.accountHolderName}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-charcoal">{request.bankName}</p>
                                                <p className="text-xs text-gray-400">{request.accountNumber}</p>
                                                <p className="text-xs text-gray-400">{request.branchName}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {request.ifscCode}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleVerify(request.id, 'APPROVED')}
                                                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleVerify(request.id, 'REJECTED')}
                                                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminBankRequests;
