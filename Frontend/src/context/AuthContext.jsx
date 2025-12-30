import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                // Determine if we should validate the token too? 
                // For now, trust localStorage for instant load, but verify in background if needed
                setUser(JSON.parse(storedUser));
                setLoading(false);
            } else {
                // No local user, check if we have a valid cookie session
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                } catch (error) {
                    // Cookie invalid or missing
                    setUser(null);
                    // localStorage.removeItem('user'); // Already empty
                } finally {
                    setLoading(false);
                }
            }
        };

        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });

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

    const logout = async () => {
        // Optional: Call API to clear cookie
        // await api.post('/auth/logout'); 
        // For now just clear local state which is effectively logout for the UI
        // And you might want to call an endpoint to clear the cookie on the server side
        localStorage.removeItem('user');
        setUser(null);
        // Reload to ensure all states are cleared or redirected
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, changePassword, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
