import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send both email and username (aliased to email) to cover backend variance
            await login(formData.email, formData.password, { username: formData.email });
            navigate('/');
        } catch (error) {
            // handled in context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page flex justify-center items-center h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="p-8 border-gray-800/50 bg-surface/50 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Welcome Back</h1>
                        <p className="text-gray-400 mt-2">Sign in to access your dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="student@college.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                                <input type="checkbox" className="rounded bg-gray-800 border-gray-700 text-primary focus:ring-primary" />
                                Remember me
                            </label>
                            <Link to="#" className="text-primary hover:text-primary/80">Forgot password?</Link>
                        </div>

                        <Button type="submit" variant="primary" className="w-full py-3" isLoading={loading}>
                            Sign In
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary hover:text-primary/80 font-medium">
                            Create Account
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
