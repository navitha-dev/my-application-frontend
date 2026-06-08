import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMessageCircle, FiMail, FiPhone, FiClock, FiUsers, FiPlus, FiList, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaTicketAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import toast from 'react-hot-toast';

const Support = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('contact'); // contact, create, list
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    // Create Ticket Form
    const [category, setCategory] = useState('RECHARGE');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (activeTab === 'list') {
            fetchTickets();
        }
    }, [activeTab]);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const response = await apiService.support.getMyTickets();
            if (response.success) {
                setTickets(response.data);
            }
        } catch (error) {
            console.error(error);
            // toast.error('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiService.support.createTicket({
                category, subject, description
            });
            if (response.success) {
                toast.success('Ticket Created Successfully');
                setSubject('');
                setDescription('');
                setActiveTab('list');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to create ticket');
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
                        <h1 className="text-2xl font-bold">Help Center</h1>
                        <p className="text-white/80 text-sm">We're here to help you 24/7</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white shadow-sm mb-4 sticky top-[88px] z-10">
                <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 ${activeTab === 'contact' ? 'border-gold text-gold' : 'border-transparent text-gray-400'}`}
                >
                    <FiPhone /> Contact Us
                </button>
                <button
                    onClick={() => setActiveTab('create')}
                    className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 ${activeTab === 'create' ? 'border-gold text-gold' : 'border-transparent text-gray-400'}`}
                >
                    <FiPlus /> New Ticket
                </button>
                <button
                    onClick={() => setActiveTab('list')}
                    className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 ${activeTab === 'list' ? 'border-gold text-gold' : 'border-transparent text-gray-400'}`}
                >
                    <FiList /> My Tickets
                </button>
            </div>

            <div className="container-custom px-4">
                {/* Contact Tab */}
                {activeTab === 'contact' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>


                        <div className="space-y-4">
                            <div className="card bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                                <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><FiMail size={24} /></div>
                                <div>
                                    <h3 className="font-bold text-obsidian">Email Support</h3>
                                    <a href="mailto:support@royalgroww.com" className="text-gold font-medium">support@royalgroww.com</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Create Ticket Tab */}
                {activeTab === 'create' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <form onSubmit={handleCreateTicket} className="space-y-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">Issue Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gold"
                                    >
                                        <option value="RECHARGE">Recharge Issue</option>
                                        <option value="WITHDRAWAL">Withdrawal Issue</option>
                                        <option value="INVESTMENT">Investment Query</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">Subject</label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Brief title of your issue"
                                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gold"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-charcoal mb-2">Description</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe your issue in detail..."
                                        rows="5"
                                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-gold"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gold text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                                >
                                    {loading ? 'Creating Ticket...' : 'Submit Ticket'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* My Tickets Tab */}
                {activeTab === 'list' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {loading ? (
                            <div className="text-center py-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto"></div>
                            </div>
                        ) : tickets.length === 0 ? (
                            <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                                <FaTicketAlt className="text-gray-300 mx-auto mb-3" size={48} />
                                <p className="text-gray-500">No tickets found</p>
                            </div>
                        ) : (
                            tickets.map(ticket => (
                                <div key={ticket.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`px-2 py-1 text-xs font-bold rounded ${ticket.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {ticket.status?.toUpperCase() || 'OPEN'}
                                        </span>
                                        <span className="text-xs text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="font-bold text-obsidian mb-1">{ticket.subject}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{ticket.description}</p>

                                    {ticket.adminReply && (
                                        <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gold">
                                            <p className="text-xs font-bold text-gold mb-1">Support Team Reply:</p>
                                            <p className="text-sm text-charcoal">{ticket.adminReply}</p>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Support;
