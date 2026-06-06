import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, percentage: 0 });
    const [pagination, setPagination] = useState({ page: 1, limit: 6, totalPages: 1 });

    const { user } = useAuth();
    const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

    const getAuthHeaders = useCallback(() => {
        if (!user || !user.token) return null;
        return {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
    }, [user]);

    const fetchTasks = useCallback(async (options = {}) => {
        if (!user) return;
        setLoading(true);
        try {
            const config = getAuthHeaders();
            const { 
                page = 1, 
                limit = 6, 
                search = '', 
                status = '', 
                priority = '', 
                sort = '' 
            } = options;
            
            // Construct query string
            let queryUrl = `${API_URL}?page=${page}&limit=${limit}`;
            if (search) queryUrl += `&search=${search}`;
            if (status) queryUrl += `&status=${status}`;
            if (priority) queryUrl += `&priority=${priority}`;
            if (sort) queryUrl += `&sort=${sort}`;

            const res = await axios.get(queryUrl, config);
            
            setTasks(res.data.data);
            if (res.data.stats) {
                setStats(res.data.stats);
            }
            if (res.data.pagination) {
                setPagination(res.data.pagination);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [user, getAuthHeaders, API_URL]);

    // Removed naive automatic fetchTasks inside useEffect to allow Dashboard to strictly control options.

    const addTask = async (taskData) => {
        try {
            const config = getAuthHeaders();
            const res = await axios.post(API_URL, taskData, config);
            setTasks((prev) => [res.data, ...prev]);
            fetchTasks(); // refresh stats
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            const config = getAuthHeaders();
            const res = await axios.put(`${API_URL}/${id}`, taskData, config);
            setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
            fetchTasks(); // refresh stats
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const config = getAuthHeaders();
            const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
            const res = await axios.patch(`${API_URL}/${id}/status`, { status: newStatus }, config);
            setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
            fetchTasks(); // refresh stats
            return res.data;
        } catch (err) {
            throw err;
        }
    };

    const deleteTask = async (id) => {
        try {
            const config = getAuthHeaders();
            await axios.delete(`${API_URL}/${id}`, config);
            setTasks((prev) => prev.filter((t) => t._id !== id));
            fetchTasks(); // refresh stats
        } catch (err) {
            throw err;
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, error, stats, pagination, fetchTasks, addTask, updateTask, toggleStatus, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
