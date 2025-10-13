// backend/controllers/taskController.js
import Task from "../models/taskModel.js";

// Create a new task for current authenticated user
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === 'Yes' || completed === true,
      owner: req.user.id
    });
    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get all global (public) tasks — visible to everyone
export const getTasksForGP = async (req, res) => {
  try {
    // Assuming "isPublic" field or similar exists in your Task schema
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Create a new task for a specific user (used by admin)
export const createTaskForUser = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const ownerId = req.params.userId;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === 'Yes' || completed === true,
      owner: ownerId
    });
    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get tasks for a specific user (admin)
export const getTasksForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single task by ID (for current user)
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId || req.params.id;
    const task = await Task.findOne({ _id: taskId, owner: req.user.id });
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a task for current user
export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed = data.completed === 'Yes' || data.completed === true;
    }
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Task not found or not yours' });
    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Admin update for a specific user task (admin route)
export const adminUpdateTaskForUser = async (req, res) => {
  try {
    const taskId = req.params.taskId || req.params.id;
    const data = { ...req.body };
    if (data.completed !== undefined) data.completed = data.completed === 'Yes' || data.completed === true;
    const updated = await Task.findOneAndUpdate(
      { _id: taskId },
      data,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete (current user)
export const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) return res.status(404).json({ success: false, message: 'Task not found or not yours' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin delete a task by id
export const adminDeleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.taskId || req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

