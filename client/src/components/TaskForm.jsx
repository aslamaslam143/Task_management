import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { X } from 'lucide-react';

const TaskForm = ({ task, onClose }) => {
    const { createTask, updateTask } = useContext(TaskContext);
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'Medium',
        dueDate: task?.dueDate ? task.dueDate.split('T')[0] : '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task) {
                await updateTask(task._id, formData);
            } else {
                await createTask(formData);
            }
            onClose();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="modal-overlay" style={styles.overlay}>
            <div className="modal-content glass-card animate-fade" style={styles.modal}>

                <div style={styles.header}>
                    <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
                    <button onClick={onClose} style={styles.closeBtn}><X /></button>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Enter task title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label>Description (Optional)</label>
                        <textarea
                            placeholder="Add details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="3"
                        />
                    </div>
                    <div style={styles.row}>
                        <div style={styles.inputGroup}>
                            <label>Priority</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Due Date</label>
                            <input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary" style={styles.submitBtn}>
                        {task ? 'Update Task' : 'Create Task'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        // Handled by .modal-overlay
    },
    modal: {
        // Handled by .modal-content
        padding: '30px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    closeBtn: {
        background: 'transparent',
        color: 'var(--text-soft)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
    },
    row: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap', // Added for responsiveness
    },
    submitBtn: {
        marginTop: '10px',
        width: '100%',
    }
};

export default TaskForm;
