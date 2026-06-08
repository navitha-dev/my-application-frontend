import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import apiService from '../../api/apiService';
import { toast } from 'react-hot-toast';
import { TableSkeleton } from '../../components/Skeletons';

const AdminWithdrawals = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            const response = await apiService.admin.getPendingWithdrawals();
            if (response.success) {
                setWithdrawals(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch withdrawals', error);
            toast.error('Failed to load withdrawals');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        try {
            const remarks = action === 'approve' ? 'Approved by Admin' : 'Rejected by Admin';
            if (action === 'approve') {
                await apiService.admin.approveWithdrawal(id, remarks);
            } else {
                await apiService.admin.rejectWithdrawal(id, remarks);
            }
            toast.success(`Withdrawal ${action}d`);
            fetchWithdrawals(); // Refresh list
        } catch (error) {
            console.error(`Failed to ${action} withdrawal`, error);
            toast.error(`Failed to ${action} withdrawal`);
        }
    };

    return (
        <AdminLayout title="Withdrawal Requests">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <TableSkeleton rows={8} />
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-ivory text-gray-600 text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 font-medium">User</th>
                                    <th className="px-6 py-3 font-medium">Amount</th>
                                    <th className="px-6 py-3 font-medium">Details</th>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {withdrawals.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No pending withdrawals
                                        </td>
                                    </tr>
                                ) : (
                                    withdrawals.map((item) => (
                                        <tr key={item.id} className="hover:bg-ivory transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-charcoal">
                                                    {item.user ? item.user.fullName : 'Unknown'}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {item.user ? item.user.mobileNumber : 'N/A'}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-red-600">₹{item.amount}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs text-gray-600 max-w-xs">{item.description}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(item.createdAt).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleAction(item.id, 'approve')}
                                                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(item.id, 'reject')}
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

export default AdminWithdrawals;
