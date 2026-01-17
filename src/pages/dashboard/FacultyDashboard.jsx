import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { queryService } from '../../services/queryService';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import AnswerModal from '../../components/AnswerModal';
import toast from 'react-hot-toast';
import { MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

const FacultyDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedQuery, setSelectedQuery] = useState(null);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const data = await queryService.getSchoolQueries();
            setQueries(data);
        } catch (error) {
            toast.error('Failed to load queries');
        } finally {
            setLoading(false);
        }
    };

    const pendingQueries = queries.filter(q => !q.answer);
    const answeredQueries = queries.filter(q => q.answer);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Faculty Dashboard</h1>
                <p className="text-gray-400">Manage and answer student queries</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Pending Column */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
                        <Clock size={20} /> Pending Queries ({pendingQueries.length})
                    </h2>
                    {loading ? <div className="text-gray-500">Loading...</div> : (
                        pendingQueries.length === 0 ? <div className="text-gray-600 italic">No pending queries.</div> :
                            pendingQueries.map(query => (
                                <Card key={query.id} className="border-yellow-500/10">
                                    <h3 className="font-semibold text-white mb-2">{query.subject}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{query.content}</p>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span>{new Date(query.createdAt || Date.now()).toLocaleDateString()}</span>
                                        <Button size="sm" onClick={() => setSelectedQuery(query)}>Answer</Button>
                                    </div>
                                </Card>
                            ))
                    )}
                </div>

                {/* Answered Column */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-green-400 flex items-center gap-2">
                        <CheckCircle size={20} /> Answered ({answeredQueries.length})
                    </h2>
                    {loading ? <div className="text-gray-500">Loading...</div> : (
                        answeredQueries.length === 0 ? <div className="text-gray-600 italic">No answered queries yet.</div> :
                            answeredQueries.map(query => (
                                <Card key={query.id} className="opacity-75 hover:opacity-100 transition-opacity">
                                    <h3 className="font-semibold text-gray-300 mb-2">{query.subject}</h3>
                                    <p className="text-gray-500 text-sm mb-3">{query.content}</p>
                                    <div className="p-3 bg-white/5 rounded text-sm text-gray-300">
                                        {query.answer}
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500 text-right">
                                        Answered by {query.facultyName}
                                    </div>
                                </Card>
                            ))
                    )}
                </div>
            </div>

            <AnswerModal
                isOpen={!!selectedQuery}
                onClose={() => setSelectedQuery(null)}
                queryId={selectedQuery?.id}
                onSuccess={fetchQueries}
            />
        </div>
    );
};

export default FacultyDashboard;
