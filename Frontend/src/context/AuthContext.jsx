import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);

            const userData = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const signup = async (userData) => {
        try {
            const { data } = await api.post('/auth/signup', userData);
            localStorage.setItem('token', data.token);
            const userPayload = {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role,
            };
            localStorage.setItem('user', JSON.stringify(userPayload));
            setUser(userPayload);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Signup failed' };
        }
    };


    const changePassword = async (currentPassword, newPassword) => {
        try {
            await api.put('/auth/update-password', { currentPassword, newPassword });
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Password update failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, changePassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
