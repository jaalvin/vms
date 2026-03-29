import axios from 'axios';

// Base API URL – uses env var if set, otherwise defaults to localhost
const API_BASE = 'https://visitor-management-system-backend-zag1.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    timeout: 15000,
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('vms_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Automatic Redirect: If server returns 401 (Unauthorized), clear session and go to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('vms_token');
            localStorage.removeItem('vms_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth service
const authService = {
    /**
     * POST /api/auth/login
     */
    login: async (email, password, role) => {
        const payload = role ? { email, password, role } : { email, password };
        const { data } = await api.post('/auth/login', payload);
        return data;
    },

    /**
     * POST /api/auth/register
     * Sends FormData if a logo file is provided, otherwise plain JSON.
     * Auto-generates fullName and initials from firstName + lastName.
     */
    register: async (orgData, logoFile) => {
        // Auto-generate required DB fields
        const fullName = (orgData.firstName.trim() + ' ' + orgData.lastName.trim()).trim();
        const initials = (
            (orgData.firstName[0] || '') + (orgData.lastName[0] || '')
        ).toUpperCase();

        const payload = {
            organization: {
                name: orgData.orgName,
                type: orgData.orgType,
                email: orgData.orgEmail,
                phone: orgData.orgPhone,
                address: orgData.address,
                maxVisitDuration: orgData.maxVisitDuration,
                photoCapture: orgData.photoCapture,
            },
            role: orgData.role,
            fullName,
            initials,
            email: orgData.userEmail,
            phone: orgData.userPhone,
            password: orgData.password,
        };

        if (logoFile) {
            // Logo selected — use FormData (multipart)
            const form = new FormData();
            form.append('logo', logoFile);
            form.append('data', JSON.stringify(payload));
            const { data } = await api.post('/auth/register', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        } else {
            // No logo — plain JSON
            const { data } = await api.post('/auth/register', payload);
            console.log('Registration successful:', data);
            return data;
        }
    },

    /**
     * POST /api/auth/forgot-password
     */
    forgotPassword: async (email) => {
        const { data } = await api.post('/auth/forgot-password', { email });
        return data;
    },

    /**
     * POST /api/auth/google-login
     */
    googleLogin: async (googleToken) => {
        const { data } = await api.post('/auth/google-login', { token: googleToken });
        return data;
    },

    /**
     * POST /api/auth/microsoft-login
     */
    microsoftLogin: async (msToken) => {
        const { data } = await api.post('/auth/microsoft-login', { token: msToken });
        return data;
    },

    /** Remove stored session */
    logout: () => {
        localStorage.removeItem('vms_token');
        localStorage.removeItem('vms_user');
    },

    /** Get current user object from localStorage */
    getCurrentUser: () => {
        const u = localStorage.getItem('vms_user');
        return u ? JSON.parse(u) : null;
    },

    /** Check if user is logged in */
    isAuthenticated: () => !!localStorage.getItem('vms_token'),
};

export { api };
export default authService;
