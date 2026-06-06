import express from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  getTaskStats,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.get('/stats', protect, getTaskStats);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.patch('/:id/status', protect, toggleTaskStatus);

export default router;
