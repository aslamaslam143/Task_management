import { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { FiLogOut, FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiCircle, FiCalendar, FiSearch, FiList, FiClock, FiActivity, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { tasks, loading, stats, pagination, toggleStatus, deleteTask, fetchTasks } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('newest');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [page, setPage] = useState(1);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTasks({ search: searchQuery, sort, status: statusFilter, priority: priorityFilter, page });
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, sort, statusFilter, priorityFilter, page, fetchTasks]);

    const onEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const onDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(id);
            toast.success('Task deleted');
        }
    };

    const onToggleStatus = async (id, currentStatus) => {
        await toggleStatus(id, currentStatus);
    };

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">TaskGenius</div>
                    <div className="user-profile">
                        <div className="user-avatar">
                            <FiUser size={14} />
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user?.name}</span>
                            <button className="logout-link" onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}>
                                <FiLogOut size={12} /> Logout
                            </button>
                        </div>
                        
                        {showLogoutConfirm && (
                            <div className="logout-popover">
                                <div className="popover-content">
                                    <p>Log out of TaskGenius?</p>
                                    <div className="popover-footer">
                                        <button className="btn-popover secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                                        <button className="btn-popover danger" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            </nav>

            <main className="dashboard-container">
                <div className="header-actions mb-4">
                    <h2>Dashboard Overview</h2>
                    <button className="btn" style={{ width: 'auto' }} onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
                        <FiPlus /> New Task
                    </button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div className="stat-label">Total Tasks</div>
                                <div className="stat-value">{stats.total}</div>
                            </div>
                            <div className="stat-icon" style={{ color: 'var(--accent)' }}><FiList size={24} /></div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div className="stat-label">Pending</div>
                                <div className="stat-value" style={{ color: 'var(--warning)' }}>{stats.pending}</div>
                            </div>
                            <div className="stat-icon" style={{ color: 'var(--warning)' }}><FiClock size={24} /></div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div className="stat-label">Completed</div>
                                <div className="stat-value" style={{ color: 'var(--success)' }}>{stats.completed}</div>
                            </div>
                            <div className="stat-icon" style={{ color: 'var(--success)' }}><FiCheckCircle size={24} /></div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div className="stat-label">Efficiency</div>
                                <div className="stat-value">{stats.percentage}%</div>
                            </div>
                            <div className="stat-icon" style={{ color: 'var(--accent)' }}><FiActivity size={24} /></div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
                            <div style={{ width: `${stats.percentage}%`, background: 'var(--gradient)', height: '100%', transition: 'width 0.5s ease' }}></div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '3.5rem', marginBottom: '2rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.75rem' }}>Your Tasks</h3>
                    <div className="filter-bar">
                        <div style={{ position: 'relative', width: '100%' }}>
                            <FiSearch style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '16px', color: 'var(--text-secondary)' }} />
                            <input 
                                type="text" 
                                className="search-input" 
                                placeholder="Search tasks..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ paddingLeft: '3rem' }}
                            />
                        </div>
                        <select className="search-input" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select className="search-input" value={priorityFilter} onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}>
                            <option value="">All Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select className="search-input" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="pending">Prioritize Pending</option>
                            <option value="completed">Prioritize Completed</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loader"></div>
                        <div className="loading-text">Fetching Tasks</div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center" style={{ padding: '3rem', background: 'var(--glass-bg)', border: '1px dashed var(--glass-border)', borderRadius: '1rem' }}>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            No tasks found. Try adjusting your filters or search.
                        </p>
                        <button className="btn" style={{ width: 'auto', margin: '0 auto' }} onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
                            Create your first task
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="task-grid">
                            {tasks.map(task => (
                            <div className="task-card" key={task._id}>
                                <div className="task-header">
                                    <div className="task-title" style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none', opacity: task.status === 'completed' ? 0.6 : 1 }}>
                                        {task.title}
                                    </div>
                                    <span className={`status-badge status-${task.status}`}>{task.status}</span>
                                </div>
                                <div className="task-desc">
                                    {task.description || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>No description provided.</span>}
                                </div>
                                <div className="task-footer">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button className="btn-icon" onClick={() => onToggleStatus(task._id, task.status)}>
                                            {task.status === 'completed' ? <FiCheckCircle size={18} color="var(--success)" /> : <FiCircle size={18} />}
                                        </button>
                                        <span className={`priority-${task.priority.toLowerCase()}`} style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                                            {task.priority} Priority
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {task.dueDate && (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginRight: '0.5rem' }}>
                                                <FiCalendar /> {new Date(task.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                        <button className="btn-icon" onClick={() => onEdit(task)} title="Edit Task">
                                            <FiEdit2 size={16} />
                                        </button>
                                        <button className="btn-icon danger" onClick={() => onDelete(task._id)} title="Delete Task">
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                        {pagination && pagination.totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                                <button className="btn" style={{ width: 'auto', background: 'transparent', border: '1px solid var(--glass-border)' }} disabled={page === 1} onClick={() => setPage(page - 1)}>
                                    Previous
                                </button>
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    Page {page} of {pagination.totalPages}
                                </span>
                                <button className="btn" style={{ width: 'auto', background: 'transparent', border: '1px solid var(--glass-border)' }} disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="mb-4">{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                        <TaskForm 
                            key={editingTask ? editingTask._id : 'new'}
                            editingTask={editingTask} 
                            setEditingTask={setEditingTask} 
                            onClose={() => setIsModalOpen(false)} 
                        />
                    </div>
                </div>
            )}


        </>
    );
};

export default Dashboard;
