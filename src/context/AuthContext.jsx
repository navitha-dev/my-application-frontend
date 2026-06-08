import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/authService';
import apiService from '../api/apiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const response = await apiService.user.getProfile();
            if (response.success && response.data) {
                // Update local storage
                const currentUser = authService.getCurrentUser();
                if (currentUser) {
                    const updatedUser = { ...currentUser, ...response.data };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                } else {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            }
        } catch (error) {
            console.error("Failed to refresh user profile", error);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            // Check if user is logged in on mount
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                await refreshUser();
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (mobileNumber, password) => {
        const response = await authService.login(mobileNumber, password);
        if (response.success && response.data) {
            setUser(response.data);
            // Fetch full profile to get KYC status etc.
            refreshUser();
        }
        return response;
    };

    const register = async (registerData) => {
        const response = await authService.register(registerData);
        if (response.success && response.data) {
            setUser(response.data);
            refreshUser();
        }
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        isAdmin: user && user.role === 'ADMIN',
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="spinner"></div>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
