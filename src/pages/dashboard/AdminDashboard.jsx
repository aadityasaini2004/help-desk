import React, { useState, useEffect } from 'react';
import { queryService } from '../../services/queryService';
import Card from '../../components/ui/Card';
import { PieChart, List, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await queryService.getSchoolQueries();
                setQueries(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const stats = {
        total: queries.length,
        pending: queries.filter(q => !q.answer).length,
        answered: queries.filter(q => q.answer).length,
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Department Overview</h1>
                <p className="text-gray-400">Head of Department / Dean Dashboard</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-900/40 to-surface border-blue-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                            <List size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{stats.total}</div>
                            <div className="text-sm text-gray-400">Total Queries</div>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-900/40 to-surface border-yellow-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-lg text-yellow-400">
                            <Clock size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{stats.pending}</div>
                            <div className="text-sm text-gray-400">Pending Actions</div>
                        </div>
                    </div>
                </Card>
                <Card className="bg-gradient-to-br from-green-900/40 to-surface border-green-500/20">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">{stats.answered}</div>
                            <div className="text-sm text-gray-400">Resolved Queries</div>
                        </div>
                    </div>
                </Card>
            </div>

            <div>
                <h2 className="text-xl font-bold text-white mb-4">All Queries</h2>
                <div className="bg-surface border border-gray-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900/50 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Faculty</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {queries.map(q => (
                                <tr key={q.id} className="text-gray-300 hover:bg-white/5">
                                    <td className="p-4 font-medium">{q.subject}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs border ${q.answer ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                            {q.answer ? 'Answered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">{new Date(q.createdAt || Date.now()).toLocaleDateString()}</td>
                                    <td className="p-4 text-sm">{q.facultyName || '-'}</td>
                                </tr>
                            ))}
                            {queries.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
