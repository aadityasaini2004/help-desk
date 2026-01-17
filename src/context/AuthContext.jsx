import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Optional: Loading state to prevent redirect before auth check
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    logout();
                } else {
                    setUser({ ...decoded, token });
                }
            } catch (error) {
                console.error("Invalid token", error);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password, extras = {}) => {
        try {
            const payload = {
                email,
                password,
                username: email, // Default username to email
                ...extras
            };
            console.log("AuthContext: Attempting login with payload:", payload);
            const response = await api.post('/api/auth/login', payload);
            console.log("Login Full Response:", response);
            console.log("Response Headers:", response.headers);

            // 1. Try body
            let token = response.data?.token ||
                response.data?.jwt ||
                response.data?.accessToken ||
                (typeof response.data === 'string' && response.data.length > 20 ? response.data : null);

            // 2. Try Headers (Common in some Spring Boot setups)
            if (!token) {
                const authHeader = response.headers['authorization'] || response.headers['Authorization'];
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    token = authHeader.substring(7);
                }
            }

            if (token && typeof token === 'string') {
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                console.log("Decoded Token / User:", decoded);
                setUser({ ...decoded, token });
                toast.success('Logged in successfully');
                return true;
            } else {
                console.error("No valid token found in body or headers.", { body: response.data, headers: response.headers });
                throw new Error("Login success (200 OK) but no token received. Backend might be sending it in a way we aren't catching.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || error.message || 'Login failed');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            console.log("AuthContext: Registering user...", userData);
            const response = await api.post('/api/auth/register', userData);
            console.log("AuthContext: Registration successful", response);
            toast.success('Registration successful! Please login.');
            return true;
        } catch (error) {
            console.error("AuthContext: Registration Failed Full Error:", error);
            if (error.response) {
                console.error("AuthContext: Error Response Data:", error.response.data);
                console.error("AuthContext: Error Status:", error.response.status);
            }
            toast.error(error.response?.data?.message || 'Registration failed. Check console.');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
