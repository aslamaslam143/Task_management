import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Briefcase, CheckCircle2, Clock3, BarChart3 } from 'lucide-react';

const Dashboard = () => {
    const { tasks, stats, loading, pagination, fetchTasks, fetchStats } = useContext(TaskContext);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        sort: 'newest',
        page: 1,
    });

    useEffect(() => {
        fetchTasks(filters);
        fetchStats();
    }, [filters, fetchTasks, fetchStats]);

    const handleSearchChange = (e) => {
        setFilters({ ...filters, search: e.target.value, page: 1 });
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 });
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    return (
        <div className="container" style={styles.container}>
            <div className="app-header" style={styles.header}>

                <div>
                    <h1 style={{fontSize: '2rem', marginBottom: '8px'}}>Task Dashboard</h1>
                    <p style={{color: 'var(--text-soft)'}}>Manage your workflow and productivity.</p>
                </div>
                <button onClick={handleAdd} className="btn-primary" style={styles.addBtn}>
                    <Plus size={20} />
                    <span>Create Task</span>
                </button>
            </div>

            {/* Stats Section */}
            <div className="stats-grid" style={styles.statsGrid}>
                <div className="glass-card animate-fade" style={styles.statCard}>
                    <div className="stat-icon" style={{...styles.statIcon, background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)'}}><Briefcase size={24} /></div>

                    <div>
                        <p style={styles.statLabel}>Total Tasks</p>
                        <h2 style={styles.statValue}>{stats?.totalTasks || 0}</h2>
                    </div>
                </div>
                <div className="glass-card animate-fade" style={{...styles.statCard, animationDelay: '0.1s'}}>
                    <div style={{...styles.statIcon, background: 'rgba(34, 197, 94, 0.1)', color: 'var(--accent-green)'}}><CheckCircle2 size={24} /></div>
                    <div>
                        <p style={styles.statLabel}>Completed</p>
                        <h2 style={styles.statValue}>{stats?.completedTasks || 0}</h2>
                    </div>
                </div>
                <div className="glass-card animate-fade" style={{...styles.statCard, animationDelay: '0.2s'}}>
                    <div style={{...styles.statIcon, background: 'rgba(234, 179, 8, 0.1)', color: 'var(--accent-yellow)'}}><Clock3 size={24} /></div>
                    <div>
                        <p style={styles.statLabel}>Pending</p>
                        <h2 style={styles.statValue}>{stats?.pendingTasks || 0}</h2>
                    </div>
                </div>
                <div className="glass-card animate-fade" style={{...styles.statCard, animationDelay: '0.3s'}}>
                    <div style={{...styles.statIcon, background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-blue)'}}><BarChart3 size={24} /></div>
                    <div>
                        <p style={styles.statLabel}>Efficiency</p>
                        <h2 style={styles.statValue}>{stats?.completionPercentage || 0}%</h2>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="controls-bar" style={styles.controls}>
                <div className="search-container" style={styles.searchBox}>
                    <Search size={18} color="var(--text-soft)" />
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={filters.search}
                        onChange={handleSearchChange}
                        style={styles.searchInput}
                    />
                </div>
                <div className="filters-group" style={styles.filters}>

                    <select name="status" value={filters.status} onChange={handleFilterChange}>
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select name="priority" value={filters.priority} onChange={handleFilterChange}>
                        <option value="">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <select name="sort" value={filters.sort} onChange={handleFilterChange}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
            </div>

            {/* Task List */}
            <div className="task-grid" style={styles.taskList}>

                {loading ? (
                    <div style={styles.loader}>Loading tasks...</div>
                ) : tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskCard key={task._id} task={task} onEdit={handleEdit} />
                    ))
                ) : (
                    <div className="glass-card" style={styles.emptyState}>
                        <h3>No tasks found</h3>
                        <p style={{color: 'var(--text-soft)', marginTop: '8px'}}>Try adjusting your filters or create a new task.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div style={styles.pagination}>
                    <button 
                        disabled={filters.page === 1} 
                        onClick={() => setFilters({...filters, page: filters.page - 1})}
                        className="btn-secondary"
                    >Prev</button>
                    <span style={{color: 'var(--text-soft)'}}>Page {filters.page} of {pagination.totalPages}</span>
                    <button 
                        disabled={filters.page === pagination.totalPages} 
                        onClick={() => setFilters({...filters, page: filters.page + 1})}
                        className="btn-secondary"
                    >Next</button>
                </div>
            )}

            {showForm && (
                <TaskForm 
                    key={editingTask?._id || 'new'}
                    task={editingTask} 
                    onClose={() => setShowForm(false)} 
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        // Handled by .app-header
    },
    addBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 24px',
    },
    statsGrid: {
        // Handled by .stats-grid
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '24px',
    },
    statIcon: {
        padding: '12px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: '0.85rem',
        color: 'var(--text-soft)',
        marginBottom: '4px',
    },
    statValue: {
        fontSize: '1.5rem',
        fontWeight: '700',
    },
    controls: {
        // Handled by .controls-bar
    },
    searchBox: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: '8px',
        padding: '0 15px',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        width: '100%',
        paddingLeft: '10px',
    },
    filters: {
        // Handled by .filters-group
    },
    taskList: {
        minHeight: '300px',
    },
    loader: {
        textAlign: 'center',
        padding: '100px',
        color: 'var(--text-soft)',
    },
    emptyState: {
        textAlign: 'center',
        padding: '80px',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginTop: '40px',
    }
};

export default Dashboard;
