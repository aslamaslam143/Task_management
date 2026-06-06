import { createContext, useState, useCallback } from 'react';
import API from '../api/axios';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const fetchTasks = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const { data } = await API.get('/tasks', { params });
            setTasks(data.tasks || []);
            setPagination({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalTasks: data.totalTasks
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const { data } = await API.get('/tasks/stats');
            setStats(data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    const createTask = async (taskData) => {
        try {
            await API.post('/tasks', taskData);
            fetchTasks();
            fetchStats();
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            await API.put(`/tasks/${id}`, taskData);
            fetchTasks();
            fetchStats();
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            fetchTasks();
            fetchStats();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleStatus = async (id) => {
        try {
            await API.patch(`/tasks/${id}/status`);
            fetchTasks();
            fetchStats();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <TaskContext.Provider value={{ 
            tasks, stats, loading, pagination, 
            fetchTasks, fetchStats, createTask, updateTask, deleteTask, toggleStatus 
        }}>
            {children}
        </TaskContext.Provider>
    );
};
