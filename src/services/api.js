import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Corrected: Bearer string interpolation
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401/403
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Force redirect
        }
        return Promise.reject(error);
    }
);

export default api;
