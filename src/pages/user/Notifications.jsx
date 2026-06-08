import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiBell, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiService from '../../api/apiService';

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

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
            // Silently fail - no notifications is fine
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ivory pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-gold to-yellow-600 p-6 text-white shadow-lg sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
                        <FiArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Notifications</h1>
                        <p className="text-white/80 text-sm">Stay updated with latest news</p>
                    </div>
                </div>
            </div>

            <div className="container-custom px-4 mt-6">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiBell className="text-gray-400" size={32} />
                        </div>
                        <h3 className="font-bold text-gray-700">No Notifications</h3>
                        <p className="text-gray-500 text-sm">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((n, index) => (
                            <motion.div
                                key={n.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-obsidian text-lg">{n.title}</h3>
                                    <span className="text-xs text-gray-400 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                                        <FiClock size={10} /> {new Date(n.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{n.message}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
