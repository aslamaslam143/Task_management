import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import toast from 'react-hot-toast';
import { FiSave, FiX, FiType, FiAlignLeft, FiFlag, FiCalendar } from 'react-icons/fi';

const TaskForm = ({ editingTask, setEditingTask, onClose }) => {
    const [title, setTitle] = useState(editingTask?.title || '');
    const [description, setDescription] = useState(editingTask?.description || '');
    const [priority, setPriority] = useState(editingTask?.priority || 'Medium');
    const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : '');
    const { addTask, updateTask } = useTasks();
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingTask) {
                await updateTask(editingTask._id, { title, description, priority, dueDate });
                toast.success('Task updated');
                setEditingTask(null);
            } else {
                await addTask({ title, description, priority, dueDate });
                toast.success('Task created');
            }
            onClose();
        } catch {
            toast.error('Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label><FiType size={14} style={{ marginRight: '5px' }} /> Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    placeholder="E.g., Complete project proposal"
                />
            </div>
            <div className="form-group">
                <label><FiAlignLeft size={14} style={{ marginRight: '5px' }} /> Description (Optional)</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Briefly describe the task..."
                />
            </div>
            <div className="flex-between" style={{ gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label><FiFlag size={14} style={{ marginRight: '5px' }} /> Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label><FiCalendar size={14} style={{ marginRight: '5px' }} /> Due Date</label>
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                    />
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                    <FiX /> Cancel
                </button>
                <button type="submit" className="btn" disabled={submitting}>
                    <FiSave /> {submitting ? 'Saving...' : (editingTask ? 'Update' : 'Create')}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
