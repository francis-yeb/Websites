import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 60000,
    withCredentials: true, // Ensure credentials (including cookies) are sent with the request
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
        
    }
});

// Fetch CSRF token and include it in headers
api.interceptors.request.use(config => {
    const token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
        config.headers['X-CSRF-TOKEN'] = token.content;
    }
    return config;
});

export default api;
