import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { TableSkeleton } from '../../components/Skeletons';
import apiService from '../../api/apiService';
import { toast } from 'react-hot-toast';
import { FiUsers, FiX, FiChevronRight, FiChevronDown } from 'react-icons/fi';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Team Tree State
    const [treeData, setTreeData] = useState(null);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [loadingTree, setLoadingTree] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await apiService.admin.getAllUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleViewTeam = async (userId) => {
        setLoadingTree(true);
        setIsTeamModalOpen(true);
        setTreeData(null);
        try {
            const response = await apiService.admin.getUserTree(userId);
            if (response.success) {
                setTreeData(response.data);
            }
        } catch (error) {
            toast.error('Failed to load team');
        } finally {
            setLoadingTree(false);
        }
    };

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            await apiService.admin.toggleUserStatus(userId, !currentStatus);
            toast.success(`User ${!currentStatus ? 'activated' : 'blocked'} successfully`);
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !currentStatus } : u));
        } catch (error) {
            toast.error('Failed to update user status');
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.mobileNumber.includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="User Management">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <TableSkeleton rows={8} />
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-ivory text-gray-600 text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 font-medium">User</th>
                                    <th className="px-6 py-3 font-medium">Contact</th>
                                    <th className="px-6 py-3 font-medium">Wallet</th>
                                    <th className="px-6 py-3 font-medium">Referrals</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Action</th>
                                    <th className="px-6 py-3 font-medium">Block</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-ivory transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold mr-3">
                                                    {user.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-charcoal">{user.fullName}</p>
                                                    <p className="text-xs text-gray-400">ID: {user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-charcoal">{user.mobileNumber}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-green-600">₹{user.walletBalance}</p>
                                            <p className="text-xs text-gray-400">Inv: ₹{user.totalInvestment}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-charcoal">{user.totalDirectReferrals}</p>
                                            <p className="text-xs text-gray-400">Code: {user.referralCode}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewTeam(user.id)}
                                                className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1"
                                            >
                                                <FiUsers /> Team
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(user.id, user.isActive)}
                                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                                    user.isActive
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                            >
                                                {user.isActive ? 'Block' : 'Unblock'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Team Tree Modal */}
            {isTeamModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <FiUsers className="text-gold" /> Referral Hierarchy
                            </h3>
                            <button onClick={() => setIsTeamModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                                <FiX />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                            {loadingTree || !treeData ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold"></div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Root User */}
                                    <div className="bg-white p-4 rounded-xl border border-gold/30 shadow-sm flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center font-bold text-xl">
                                            {treeData.user.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{treeData.user.fullName}</h4>
                                            <p className="text-sm text-gray-500">{treeData.user.mobileNumber}</p>
                                            <div className="flex gap-4 mt-1 text-xs font-medium">
                                                <span className="text-green-600">Invested: ₹{treeData.user.totalInvestment}</span>
                                                <span className="text-blue-600">Earnings: ₹{treeData.user.totalReferralEarnings}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Levels */}
                                    <div className="pl-8 border-l-2 border-gray-200 space-y-8">

                                        {/* Level 1 */}
                                        <div>
                                            <h5 className="font-bold text-sm text-gray-400 uppercase mb-3 flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                                                Level 1 (Direct Team) - {treeData.level1.length} Members
                                            </h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {treeData.level1.map(u => (
                                                    <UserCard key={u.id} user={u} />
                                                ))}
                                                {treeData.level1.length === 0 && <p className="text-sm text-gray-400 italic">No direct referrals</p>}
                                            </div>
                                        </div>

                                        {/* Level 2 */}
                                        <div>
                                            <h5 className="font-bold text-sm text-gray-400 uppercase mb-3 flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
                                                Level 2 - {treeData.level2.length} Members
                                            </h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {treeData.level2.map(u => (
                                                    <UserCard key={u.id} user={u} />
                                                ))}
                                                {treeData.level2.length === 0 && <p className="text-sm text-gray-400 italic">No level 2 members</p>}
                                            </div>
                                        </div>

                                        {/* Level 3 */}
                                        <div>
                                            <h5 className="font-bold text-sm text-gray-400 uppercase mb-3 flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs">3</span>
                                                Level 3 - {treeData.level3.length} Members
                                            </h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {treeData.level3.map(u => (
                                                    <UserCard key={u.id} user={u} />
                                                ))}
                                                {treeData.level3.length === 0 && <p className="text-sm text-gray-400 italic">No level 3 members</p>}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

const UserCard = ({ user }) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
            {user.fullName.charAt(0)}
        </div>
        <div className="min-w-0">
            <p className="font-bold text-sm text-gray-800 truncate">{user.fullName}</p>
            <p className="text-xs text-gray-400">₹{user.totalInvestment} Inv</p>
        </div>
    </div>
);

export default AdminUsers;
