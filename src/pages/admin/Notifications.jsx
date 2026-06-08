import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FiBell, FiSend, FiTrash2, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { TableSkeleton } from '../../components/Skeletons';
import apiService from '../../api/apiService';

const AdminNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await apiService.admin.getNotifications();
            if (response.success) {
                setNotifications(response.data);
            }
        } catch (error) {
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const handleBroadcast = async (e) => {
        e.preventDefault();
        if (!title || !message) return;

        setSending(true);
        try {
            const response = await apiService.admin.broadcastNotification(title, message);
            if (response.success) {
                toast.success('Notification Broadcasted!');
                setTitle('');
                setMessage('');
                fetchNotifications();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to send');
        } finally {
            setSending(false);
        }
    };

    return (
        <AdminLayout title="Notifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Create Notification */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-gold/10 p-3 rounded-full text-gold">
                            <FiBell size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Broadcast Message</h3>
                            <p className="text-sm text-gray-500">Send alerts to all users instantly</p>
                        </div>
                    </div>

                    <form onSubmit={handleBroadcast} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Important Update..."
                                className="w-full p-3 bg-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-gold font-bold"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your announcement here..."
                                className="w-full p-3 bg-ivory border border-gray-200 rounded-lg focus:outline-none focus:border-gold h-32 resize-none"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={sending}
                            className="w-full py-3 bg-gold text-white font-bold rounded-lg hover:bg-gold-dark transition-colors flex items-center justify-center gap-2"
                        >
                            {sending ? 'Sending...' : <><FiSend /> Send Broadcast</>}
                        </button>
                    </form>
                </div>

                {/* History */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-[600px]">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">History</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {loading ? (
                            <TableSkeleton rows={4} />
                        ) : notifications.length === 0 ? (
                            <div className="text-center text-gray-400 py-10">
                                <p>No notifications sent yet</p>
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div key={n.id} className="p-4 bg-ivory rounded-lg border border-gray-100">
                                    <h4 className="font-bold text-charcoal">{n.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                                        <FiClock /> {new Date(n.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminNotifications;
