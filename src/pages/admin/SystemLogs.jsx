import React, { useState, useEffect } from 'react';
import { HiRefresh, HiTrash, HiSearch, HiServer, HiDesktopComputer } from 'react-icons/hi';
import { logger } from '../../utils/logger';
import AdminLayout from './AdminLayout';
import apiService from '../../api/apiService';

const SystemLogs = () => {
    const [activeTab, setActiveTab] = useState('BACKEND'); // 'FRONTEND' or 'BACKEND'
    const [frontendLogs, setFrontendLogs] = useState([]);
    const [backendLogs, setBackendLogs] = useState('');
    const [filterLevel, setFilterLevel] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchFrontendLogs = () => {
        setFrontendLogs(logger.getLogs());
    };

    const fetchBackendLogs = async () => {
        setLoading(true);
        try {
            const response = await apiService.admin.getSystemLogs();
            if (response.success) {
                setBackendLogs(response.data || 'No backend logs found.');
            } else {
                setBackendLogs('Failed to fetch backend logs: ' + (response.message || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            setBackendLogs('Error fetching backend logs: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = () => {
        if (activeTab === 'FRONTEND') {
            fetchFrontendLogs();
        } else {
            fetchBackendLogs();
        }
    };

    useEffect(() => {
        fetchLogs();
        // optionally refresh local frontend logs periodically
        let interval;
        if (activeTab === 'FRONTEND') {
            interval = setInterval(fetchFrontendLogs, 5000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeTab]);

    const handleClearLogs = () => {
        if (activeTab === 'FRONTEND') {
            if (window.confirm("Are you sure you want to clear all frontend logs?")) {
                logger.clearLogs();
                fetchFrontendLogs();
            }
        } else {
            window.alert("Clearing backend logs from the dashboard is not currently supported for safety reasons.");
        }
    };

    const manuallyTriggerError = () => {
        try {
            // Induce a fake intentional error
            throw new Error("This is a simulated test error from the Admin panel!");
        } catch (e) {
            logger.error(e.message, e);
            if (activeTab === 'FRONTEND') fetchFrontendLogs();
        }
    };

    const getLevelColor = (level) => {
        switch (level) {
            case 'INFO': return 'bg-blue-100 text-blue-800';
            case 'WARN': return 'bg-yellow-100 text-yellow-800';
            case 'ERROR': return 'bg-red-100 text-red-800';
            case 'DEBUG': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredFrontendLogs = frontendLogs.filter(log => {
        const matchesLevel = filterLevel === 'ALL' || log.level === filterLevel;
        const searchInput = searchTerm.toLowerCase();
        const matchesSearch = log.message?.toLowerCase().includes(searchInput) ||
            log.data?.toLowerCase().includes(searchInput);
        return matchesLevel && matchesSearch;
    });

    return (
        <AdminLayout title="System Logs">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Application Logs</h1>
                        <p className="text-gray-500">Monitor backend server activity and frontend exceptions.</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <button
                            onClick={manuallyTriggerError}
                            className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium ${activeTab === 'BACKEND' ? 'hidden' : ''}`}
                        >
                            Test Error
                        </button>
                        <button
                            onClick={handleClearLogs}
                            className={`flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex-1 sm:flex-none justify-center text-sm font-medium ${activeTab === 'BACKEND' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <HiTrash className="w-4 h-4" />
                            Clear Logs
                        </button>
                        <button
                            onClick={fetchLogs}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex-1 sm:flex-none justify-center text-sm font-medium disabled:opacity-70"
                        >
                            <HiRefresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('BACKEND')}
                        className={`flex items-center gap-2 py-4 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'BACKEND' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <HiServer className="w-5 h-5" />
                        Backend Logs
                    </button>
                    <button
                        onClick={() => setActiveTab('FRONTEND')}
                        className={`flex items-center gap-2 py-4 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === 'FRONTEND' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <HiDesktopComputer className="w-5 h-5" />
                        Frontend Logs
                    </button>
                </div>

                {/* Filters - Only visible on Frontend tab for now */}
                {activeTab === 'FRONTEND' && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search logs by message or data..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            {['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'].map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setFilterLevel(level)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterLevel === level
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Log Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {activeTab === 'FRONTEND' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-48">Timestamp</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Level</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Message / Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredFrontendLogs.length > 0 ? (
                                        filteredFrontendLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getLevelColor(log.level)}`}>
                                                        {log.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900 break-words">{log.message}</div>
                                                    {log.data && (
                                                        <div className="mt-1 text-xs font-mono text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 overflow-x-auto">
                                                            {log.data}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                        <HiSearch className="w-8 h-8 text-gray-400" />
                                                    </div>
                                                    <p className="font-medium text-gray-900 text-lg">No logs found</p>
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {frontendLogs.length === 0 ? "Application logger is currently empty." : "Try adjusting your search or filters."}
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-[#1e1e1e] p-4 text-gray-300 font-mono text-xs sm:text-sm h-[600px] overflow-y-auto whitespace-pre-wrap rounded-b-xl leading-relaxed">
                            {loading && !backendLogs ? (
                                <div className="flex items-center justify-center h-full space-x-2 text-gray-400">
                                    <HiRefresh className="w-6 h-6 animate-spin" />
                                    <span>Fetching server logs...</span>
                                </div>
                            ) : (
                                backendLogs
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default SystemLogs;
