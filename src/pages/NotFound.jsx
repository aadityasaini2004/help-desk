import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-800">404</h1>
            <p className="text-2xl text-gray-400 mt-4 mb-8">Page not found</p>
            <Link to="/">
                <Button size="lg">Return Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
