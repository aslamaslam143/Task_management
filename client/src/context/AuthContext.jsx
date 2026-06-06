import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = `${(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')}/auth`;

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    // Fetch user profile based on token. We actually implemented GET /api/auth/profile
                    const res = await axios.get(`${API_URL}/profile`, config);
                    setUser({ ...res.data, token });
                } catch (error) {
                    console.error('Token invalid or expired', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const registerUser = async (userData) => {
        const res = await axios.post(`${API_URL}/register`, userData);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
        }
        return res.data;
    };

    const loginUser = async (userData) => {
        const res = await axios.post(`${API_URL}/login`, userData);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data);
        }
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, registerUser, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
