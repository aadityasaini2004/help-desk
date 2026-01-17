import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'STUDENT' // Default role
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                username: formData.email.split('@')[0], // Fallback username
                password: formData.password,
                role: formData.role
            };
            console.log("Registering with payload:", payload);

            try {
                await register(payload);
                navigate('/login');
            } catch (innerError) {
                console.error("Register component caught error:", innerError);
                // AuthContext usually handles the toast, but we log here for safety
            }
        } catch (error) {
            // handled in context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page flex justify-center items-center py-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="p-8 border-gray-800/50 bg-surface/50 backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Create Account</h1>
                        <p className="text-gray-400 mt-2">Join the college community helpdesk</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="student@college.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm text-gray-400 font-medium ml-1">Role</label>
                            <select
                                className="bg-surface border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="HOD">HOD</option>
                                <option value="DEAN">Dean</option>
                            </select>
                        </div>

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />


                        <Button type="submit" variant="primary" className="w-full py-3 mt-4" isLoading={loading}>
                            Register
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                            Sign In
                        </Link>
                    </p>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;
