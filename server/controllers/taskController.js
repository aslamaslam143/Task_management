import Task from '../models/Task.js';

// @desc    Get all user tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  const { search, status, priority, sort, page = 1, limit = 10 } = req.query;
  const query = { user: req.user._id };

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  if (status) {
    query.status = status;
  }
  if (priority) {
    query.priority = priority;
  }

  let sortQuery = { createdAt: -1 };
  if (sort === 'oldest') sortQuery = { createdAt: 1 };
  if (sort === 'newest') sortQuery = { createdAt: -1 };

  try {
    const skip = (page - 1) * limit;
    const totalTasks = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      tasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title) {
    res.status(400).json({ message: 'Title is required' });
    return;
  }

  try {
    const task = new Task({
      user: req.user._id,
      title,
      description,
      priority,
      dueDate,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      if (task.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.priority = priority || task.priority;
      task.dueDate = dueDate || task.dueDate;
      task.status = status || task.status;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      if (task.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      await task.deleteOne();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
const toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      if (task.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized' });
        return;
      }

      task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ user: req.user._id, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ user: req.user._id, status: 'Pending' });
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage: Math.round(completionPercentage),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus, getTaskStats };
