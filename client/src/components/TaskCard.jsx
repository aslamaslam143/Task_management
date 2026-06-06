import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Trash2, Edit2, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit }) => {
    const { toggleStatus, deleteTask } = useContext(TaskContext);

    const getPriorityColor = (p) => {
        if (p === 'High') return 'var(--accent-red)';
        if (p === 'Medium') return 'var(--accent-yellow)';
        return 'var(--accent-green)';
    };

    return (
        <div className="glass-card animate-fade" style={styles.card}>
            <div style={styles.header}>
                <button onClick={() => toggleStatus(task._id)} style={styles.statusBtn}>
                    {task.status === 'Completed' ? (
                        <CheckCircle size={22} color="var(--accent-green)" />
                    ) : (
                        <Circle size={22} color="var(--text-soft)" />
                    )}
                </button>
                <div style={styles.titleContainer}>
                    <h3 style={{ 
                        ...styles.title, 
                        textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                        color: task.status === 'Completed' ? 'var(--text-soft)' : 'var(--text-main)'
                    }}>
                        {task.title}
                    </h3>
                    <div style={styles.meta}>
                        <span style={styles.priority}>
                            <AlertCircle size={12} color={getPriorityColor(task.priority)} />
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span style={styles.date}>
                                <Clock size={12} />
                                {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
                <div style={styles.actions}>
                    <button onClick={() => onEdit(task)} style={styles.actionBtn}><Edit2 size={16} /></button>
                    <button onClick={() => deleteTask(task._id)} style={{...styles.actionBtn, color: 'var(--accent-red)'}}><Trash2 size={16} /></button>
                </div>
            </div>
            {task.description && (
                <p style={{
                    ...styles.description,
                    color: task.status === 'Completed' ? 'var(--text-soft)' : 'var(--text-soft)'
                }}>{task.description}</p>
            )}
        </div>
    );
};

const styles = {
    card: {
        marginBottom: '16px',
        padding: '20px',
        transition: 'transform 0.2s',
    },
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
    },
    statusBtn: {
        background: 'transparent',
        padding: '5px 0',
        cursor: 'pointer',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: '1.1rem',
        marginBottom: '4px',
    },
    meta: {
        display: 'flex',
        gap: '15px',
        fontSize: '0.75rem',
        color: 'var(--text-soft)',
    },
    priority: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    date: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    actions: {
        display: 'flex',
        gap: '10px',
    },
    actionBtn: {
        background: 'transparent',
        color: 'var(--text-soft)',
        padding: '5px',
        cursor: 'pointer',
    },
    description: {
        fontSize: '0.9rem',
        marginTop: '12px',
        marginLeft: '37px',
        lineHeight: '1.5',
    }
};

export default TaskCard;
