import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: '#121212',
                            color: '#fff',
                            border: '1px solid #333',
                        },
                    }}
                />
                {/* We can add page transitions here if we wrap children properly or let pages handle it */}
                {children}
            </main>
            <footer className="border-t border-gray-800 bg-surface/50 py-6">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} College HelpDesk System. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
