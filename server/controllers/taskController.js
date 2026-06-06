import Task from '../models/Task.js';

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
    try {
        const { status, priority, search, sort, page, limit } = req.query;

        const query = { user: req.user.id };

        if (status) query.status = status;
        if (priority) query.priority = priority;
        if (search) query.title = { $regex: search, $options: 'i' };

        // Pagination calculations
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const startIndex = (pageNum - 1) * limitNum;

        // Sorting
        let sortObj = { createdAt: -1 };
        if (sort === 'oldest') sortObj = { createdAt: 1 };
        if (sort === 'completed') sortObj = { status: -1, createdAt: -1 };
        if (sort === 'pending') sortObj = { status: 1, createdAt: -1 };

        const totalFiltered = await Task.countDocuments(query);

        const tasks = await Task.find(query)
            .sort(sortObj)
            .skip(startIndex)
            .limit(limitNum);

        // Calculate global statistics for the user
        const allUserTasks = await Task.find({ user: req.user.id });
        const total = allUserTasks.length;
        const completed = allUserTasks.filter(t => t.status === 'completed').length;
        const pending = allUserTasks.filter(t => t.status === 'pending').length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

        res.status(200).json({
            count: tasks.length,
            total: totalFiltered,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(totalFiltered / limitNum)
            },
            stats: {
                total,
                completed,
                pending,
                percentage
            },
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure the logged in user matches the task user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, priority } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Please add a title' });
        }

        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            priority,
            user: req.user.id,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
// @desc    Patch task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the task user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the task user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
