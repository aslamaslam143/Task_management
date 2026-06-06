import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import toast from 'react-hot-toast';

const TaskForm = ({ editingTask, setEditingTask, onClose }) => {
    const [title, setTitle] = useState(editingTask?.title || '');
    const [description, setDescription] = useState(editingTask?.description || '');
    const [priority, setPriority] = useState(editingTask?.priority || 'Medium');
    const [dueDate, setDueDate] = useState(editingTask?.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : '');
    const { addTask, updateTask } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    placeholder="E.g., Complete project proposal"
                />
            </div>
            <div className="form-group">
                <label>Description (Optional)</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Briefly describe the task..."
                />
            </div>
            <div className="flex-between" style={{ gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                    <label>Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                    <label>Due Date</label>
                    <input 
                        type="date" 
                        value={dueDate} 
                        onChange={(e) => setDueDate(e.target.value)} 
                    />
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="btn">
                    {editingTask ? 'Update Task' : 'Create Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
