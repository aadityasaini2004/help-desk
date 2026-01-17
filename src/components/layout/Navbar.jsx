import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-surface/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">H</span>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">HelpDesk</span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {user ? (
                                <>
                                    <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Dashboard
                                    </Link>
                                    <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-700">
                                        <span className="text-sm text-gray-400">
                                            {user.sub || user.email} <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700 ml-1">{user.role}</span>
                                        </span>
                                        <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
                                            <LogOut size={18} />
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="primary">Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-surface border-b border-gray-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {user ? (
                                <>
                                    <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                                    <div className="px-3 py-2 text-sm text-gray-400">
                                        Signed in as {user.sub} ({user.role})
                                    </div>
                                    <button onClick={handleLogout} className="w-full text-left text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                                    <Link to="/register" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
