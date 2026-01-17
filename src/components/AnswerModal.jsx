import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Card from './ui/Card';
import { X } from 'lucide-react';
import { queryService } from '../services/queryService';
import toast from 'react-hot-toast';

const AnswerModal = ({ isOpen, onClose, queryId, onSuccess }) => {
    const [answer, setAnswer] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await queryService.answerQuery(queryId, answer, facultyName);
            toast.success('Query answered successfully');
            onSuccess();
            onClose();
            setAnswer('');
            setFacultyName('');
        } catch (error) {
            toast.error('Failed to submit answer');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full max-w-lg"
                >
                    <Card className="relative">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-white">Answer Query</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm text-gray-400 font-medium ml-1">Your Name</label>
                                <input
                                    className="bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                    value={facultyName}
                                    onChange={(e) => setFacultyName(e.target.value)}
                                    required
                                    placeholder="Prof. Smith"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm text-gray-400 font-medium ml-1">Answer</label>
                                <textarea
                                    className="bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 min-h-[150px]"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    required
                                    placeholder="Type your answer here..."
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                                <Button type="submit" isLoading={loading}>Submit Answer</Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AnswerModal;
