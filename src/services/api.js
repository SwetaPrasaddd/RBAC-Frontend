import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:7777/api',
});

// ✅ Add token if exists and return config
API.interceptors.request.use((config) => {
    const authData = localStorage.getItem('auth');
    const parsedAuth = authData ? JSON.parse(authData) : null;
    const token = parsedAuth?.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // 🔥 This line was missing!
}, (error) => {
    return Promise.reject(error);
});

export default API;
