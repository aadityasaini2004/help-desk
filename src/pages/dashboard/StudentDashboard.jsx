import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { queryService } from '../../services/queryService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Skeleton from '../../components/ui/Skeleton';
import toast from 'react-hot-toast';
import { Plus, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';

const StudentDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAskForm, setShowAskForm] = useState(false);
    const [newQuery, setNewQuery] = useState({ subject: '', content: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            const data = await queryService.getStudentQueries();
            setQueries(data);
        } catch (error) {
            toast.error('Failed to load queries');
        } finally {
            setLoading(false);
        }
    };

    const handleAskQuery = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await queryService.askQuery(newQuery);
            toast.success('Query submitted successfully');
            setNewQuery({ subject: '', content: '' });
            setShowAskForm(false);
            fetchQueries();
        } catch (error) {
            toast.error('Failed to submit query');
        } finally {
            setSubmitting(false);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Queries</h1>
                    <p className="text-gray-400">Manage and track your questions</p>
                </div>
                <Button onClick={() => setShowAskForm(!showAskForm)} variant="primary">
                    {showAskForm ? 'Cancel' : <><Plus size={20} /> Ask Query</>}
                </Button>
            </div>

            {showAskForm && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <Card className="border-primary/30">
                        <h2 className="text-xl font-semibold mb-4 text-white">Ask a New Query</h2>
                        <form onSubmit={handleAskQuery} className="space-y-4">
                            <Input
                                label="Subject"
                                value={newQuery.subject}
                                onChange={(e) => setNewQuery({ ...newQuery, subject: e.target.value })}
                                required
                                placeholder="Brief subject of your query"
                            />
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm text-gray-400 font-medium ml-1">Content</label>
                                <textarea
                                    className="bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 min-h-[100px]"
                                    value={newQuery.content}
                                    onChange={(e) => setNewQuery({ ...newQuery, content: e.target.value })}
                                    required
                                    placeholder="Describe your issue in detail..."
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" isLoading={submitting}>Submit Query</Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            )}

            {loading ? (
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse border-gray-800">
                            <Skeleton className="h-6 w-3/4 mb-3" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6" />
                        </Card>
                    ))}
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4"
                >
                    {queries.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No queries found. Start by asking one!</p>
                        </div>
                    ) : (
                        queries.map((query) => (
                            <motion.div key={query.id} variants={item}>
                                <Card className="hover:border-gray-600 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-1">{query.subject}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-2">{query.content}</p>
                                        </div>
                                        <span className={clsx(
                                            "px-2 py-1 rounded-full text-xs font-medium border",
                                            query.answer
                                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        )}>
                                            {query.answer ? 'Answered' : 'Pending'}
                                        </span>
                                    </div>

                                    {query.answer && (
                                        <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2 text-green-400 text-sm font-medium">
                                                <CheckCircle size={16} /> Faculty Answer
                                            </div>
                                            <p className="text-gray-300 text-sm">{query.answer}</p>
                                            <div className="mt-2 text-xs text-gray-500">
                                                Answered by: {query.facultyName || 'Staff'}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {new Date(query.createdAt || Date.now()).toLocaleDateString()}
                                        </span>
                                        {/* Add more metadata if available */}
                                    </div>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default StudentDashboard;
