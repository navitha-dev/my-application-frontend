import api from './axios.config';

export const authService = {
    // Send OTP for registration
    sendOtp: async (mobileNumber, otpType = 'REGISTRATION') => {
        return await api.post('/auth/send-otp', {
            mobileNumber,
            otpType,
        });
    },

    // Register new user
    register: async (registerData) => {
        return await api.post('/auth/register', registerData);
    },

    // Reset Password
    resetPassword: async (resetData) => {
        return await api.post('/auth/reset-password', resetData);
    },

    // Login user
    login: async (mobileNumber, password) => {
        const response = await api.post('/auth/login', {
            mobileNumber,
            password,
        });

        // Store token and user data
        if (response.success && response.data) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    // Get current user data
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Check if user is admin
    isAdmin: () => {
        const user = authService.getCurrentUser();
        return user && user.role === 'ADMIN';
    },
};

export default authService;
