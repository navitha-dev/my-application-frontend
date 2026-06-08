import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FiMessageSquare, FiCheckCircle, FiClock, FiSearch, FiRefreshCcw, FiSend, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { TableSkeleton } from '../../components/Skeletons';
import apiService from '../../api/apiService';

const AdminSupportDesk = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [reply, setReply] = useState('');
    const [sending, setSending] = useState(false);
    const [filter, setFilter] = useState('ALL'); // ALL, OPEN, RESOLVED

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const response = await apiService.admin.getAllSupportTickets();
            if (response.success) {
                setTickets(response.data);
            }
        } catch (error) {
            toast.error('Failed to load tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        if (!reply.trim()) return;

        setSending(true);
        try {
            const response = await apiService.admin.replyToTicket(selectedTicket.id, reply);
            if (response.success) {
                toast.success('Reply sent successfully');
                setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: 'resolved', adminReply: reply } : t));
                setSelectedTicket(null);
                setReply('');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Failed to send reply');
        } finally {
            setSending(false);
        }
    };

    const filteredTickets = tickets.filter(t => {
        if (filter === 'ALL') return true;
        return t.status?.toUpperCase() === filter;
    });

    return (
        <AdminLayout title="Support Desk">
            <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">

                {/* Left: Ticket List */}
                <div className={`w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden ${selectedTicket ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-ivory">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter('ALL')}
                                className={`px-3 py-1 text-xs font-bold rounded-full ${filter === 'ALL' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}
                            >All</button>
                            <button
                                onClick={() => setFilter('OPEN')}
                                className={`px-3 py-1 text-xs font-bold rounded-full ${filter === 'OPEN' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}
                            >Open</button>
                        </div>
                        <button onClick={fetchTickets} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
                            <FiRefreshCcw />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {loading ? (
                            <TableSkeleton rows={5} />
                        ) : filteredTickets.length === 0 ? (
                            <div className="text-center py-10 text-gray-400">
                                <FiMessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No tickets found</p>
                            </div>
                        ) : (
                            filteredTickets.map(ticket => (
                                <div
                                    key={ticket.id}
                                    onClick={() => setSelectedTicket(ticket)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedTicket?.id === ticket.id ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-xs font-bold text-gray-400">#{ticket.id} &bull; {ticket.category || 'General'}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ticket.status === 'resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {ticket.status?.toUpperCase() || 'OPEN'}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-gray-800 truncate">{ticket.subject}</h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">{ticket.description}</p>
                                    <div className="mt-2 text-xs text-gray-400 flex justify-between">
                                        <span>{ticket.user?.fullName || 'User'}</span>
                                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right: Chat View */}
                <div className={`w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden ${!selectedTicket ? 'hidden md:flex' : 'flex'}`}>
                    {selectedTicket ? (
                        <>
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 bg-ivory flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setSelectedTicket(null)} className="md:hidden mr-2 p-1 hover:bg-gray-100 rounded">
                                            <FiArrowLeft size={18} className="text-gray-600" />
                                        </button>
                                        <h3 className="font-bold text-gray-800 text-lg">{selectedTicket.subject}</h3>
                                    </div>
                                    <p className="text-xs text-gray-500">Ticket #{selectedTicket.id} &bull; via {selectedTicket.user?.email}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedTicket.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {selectedTicket.status?.toUpperCase()}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-ivory/50">
                                {/* User Message */}
                                <div className="flex gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                        {selectedTicket.user?.fullName?.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm inline-block max-w-[90%]">
                                            <p className="text-charcoal whitespace-pre-wrap">{selectedTicket.description}</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1 ml-2">{new Date(selectedTicket.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Admin Reply */}
                                {selectedTicket.adminReply && (
                                    <div className="flex gap-4 mb-6 flex-row-reverse">
                                        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold shrink-0">
                                            A
                                        </div>
                                        <div className="flex-1 text-right">
                                            <div className="bg-gold/10 p-4 rounded-2xl rounded-tr-none text-left inline-block max-w-[90%]">
                                                <p className="text-charcoal whitespace-pre-wrap">{selectedTicket.adminReply}</p>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1 mr-2">Replied just now</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Reply Box */}
                            <div className="p-4 border-t border-gray-100 bg-white">
                                {selectedTicket.status === 'resolved' ? (
                                    <div className="bg-green-50 p-4 rounded-xl text-center">
                                        <FiCheckCircle className="mx-auto text-green-500 mb-2" />
                                        <p className="text-green-800 font-bold text-sm">This ticket is resolved.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleReply} className="relative">
                                        <textarea
                                            value={reply}
                                            onChange={(e) => setReply(e.target.value)}
                                            placeholder="Type your reply here..."
                                            className="w-full p-4 pr-12 bg-ivory border border-gray-200 rounded-xl focus:outline-none focus:border-gold resize-none h-24"
                                            required
                                        ></textarea>
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="absolute bottom-3 right-3 p-2 bg-gold text-white rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-50"
                                        >
                                            <FiSend />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-300 bg-ivory/50">
                            <FiMessageSquare size={64} className="mb-4 opacity-50" />
                            <p className="font-medium">Select a ticket to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminSupportDesk;
