// import Task from "../models/taskModel.js";

// // ------------------------- Create Task (User) -------------------------
// // ------------------------- Create Task (User) -------------------------
// export const createTask = async (req, res) => {
//   try {
//     const { title, description, priority, dueDate, completed } = req.body;

//     // ✅ Get the authenticated user's ID from token
//     const ownerId = req.user._id || req.user.id;

//     // ✅ Create the task with correct fields
//     const task = new Task({
//       title,
//       description,
//       priority,
//       dueDate,
//       completed: completed === "Yes" || completed === true,
//       owner: ownerId,         // ✅ Correct variable
//       adminCreated: req.user.role === "admin",     // ✅ Use your schema’s field name (not assignedByAdmin)
//     });

//     const saved = await task.save();
//     res.status(201).json({ success: true, task: saved });
//   } catch (err) {
//     console.error("Task creation error:", err);
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Create Task for Specific User (Admin) -------------------------
// export const createTaskForUser = async (req, res) => {
//   try {
//     const { title, description, priority, dueDate, completed } = req.body;
//     const ownerId = req.params.userId;

//     const task = new Task({
//       title,
//       description,
//       priority,
//       dueDate,
//       completed: completed === "Yes" || completed === true,
//       owner: ownerId,
//       assignedByAdmin: true, // ✅ Mark admin-created task
//     });

//     const saved = await task.save();
//     res.status(201).json({ success: true, task: saved });
//   } catch (err) {
//     console.error("Admin task creation error:", err);
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Get Tasks for Logged-In User -------------------------
// export const getTasks = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;
//     const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
//     res.json({ success: true, tasks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Get Global/Public Tasks -------------------------
// export const getTasksForGP = async (req, res) => {
//   try {
//     const tasks = await Task.find({ adminCreated: true }).sort({ createdAt: -1 });
//     res.json({ success: true, tasks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ------------------------- Get Tasks for Specific User (Admin) -------------------------
// export const getTasksForUser = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
//     res.json({ success: true, tasks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Get Single Task (Current User) -------------------------
// export const getTaskById = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;
//     const taskId = req.params.taskId || req.params.id;

//     const task = await Task.findOne({ _id: taskId, owner: userId });
//     if (!task)
//       return res
//         .status(404)
//         .json({ success: false, message: "Task not found" });

//     res.json({ success: true, task });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Update Task (Current User) -------------------------
// export const updateTask = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;
//     const data = { ...req.body };

//     if (data.completed !== undefined)
//       data.completed = data.completed === "Yes" || data.completed === true;

//     const updated = await Task.findOneAndUpdate(
//       { _id: req.params.id, owner: userId },
//       data,
//       { new: true, runValidators: true }
//     );

//     if (!updated)
//       return res
//         .status(404)
//         .json({ success: false, message: "Task not found or not yours" });

//     res.json({ success: true, task: updated });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Admin Update Task -------------------------
// export const adminUpdateTaskForUser = async (req, res) => {
//   try {
//     const taskId = req.params.taskId || req.params.id;
//     const data = { ...req.body };

//     if (data.completed !== undefined)
//       data.completed = data.completed === "Yes" || data.completed === true;

//     const updated = await Task.findOneAndUpdate({ _id: taskId }, data, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updated)
//       return res
//         .status(404)
//         .json({ success: false, message: "Task not found" });

//     res.json({ success: true, task: updated });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Delete Task (Current User) -------------------------
// export const deleteTask = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id;

//     const deleted = await Task.findOneAndDelete({
//       _id: req.params.id,
//       owner: userId,
//     });

//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Task not found or not yours" });

//     res.json({ success: true, message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // ------------------------- Admin Delete Task -------------------------
// export const adminDeleteTask = async (req, res) => {
//   try {
//     const deleted = await Task.findByIdAndDelete(
//       req.params.taskId || req.params.id
//     );
//     if (!deleted)
//       return res
//         .status(404)
//         .json({ success: false, message: "Task not found" });

//     res.json({ success: true, message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



// ---------------------------------------------------------------




import Task from "../models/taskModel.js";

// ------------------------- Create Task (User) -------------------------
// ------------------------- Create Task (User) -------------------------
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    // ✅ Get the authenticated user's ID from token
    const ownerId = req.user._id || req.user.id;

    // ✅ Create the task with correct fields
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === true,
      owner: ownerId,         // ✅ Correct variable
      adminCreated: req.user.role === "admin",     // ✅ Use your schema’s field name (not assignedByAdmin)
    });

    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    console.error("Task creation error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// ------------------------- Create Task for Specific User (Admin) -------------------------
export const createTaskForUser = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const ownerId = req.params.userId;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === true,
      owner: ownerId,
      assignedByAdmin: true, // ✅ Mark admin-created task
    });

    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    console.error("Admin task creation error:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// ------------------------- Get Tasks for Logged-In User -------------------------
export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------- Get Global/Public Tasks -------------------------
export const getTasksForGP = async (req, res) => {
  try {
    const tasks = await Task.find({ adminCreated: true }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------------- Get Tasks for Specific User (Admin) -------------------------
export const getTasksForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------- Get Single Task (Current User) -------------------------
export const getTaskById = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const taskId = req.params.taskId || req.params.id;

    const task = await Task.findOne({ _id: taskId, owner: userId });
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------- Update Task (Current User) -------------------------
export const updateTask = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const data = { ...req.body };

    if (data.completed !== undefined)
      data.completed = data.completed === "Yes" || data.completed === true;

    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: userId },
      data,
      { new: true, runValidators: true }
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Task not found or not yours" });

    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ------------------------- Admin Update Task -------------------------
export const adminUpdateTaskForUser = async (req, res) => {
  try {
    const taskId = req.params.taskId || req.params.id;
    const data = { ...req.body };

    if (data.completed !== undefined)
      data.completed = data.completed === "Yes" || data.completed === true;

    const updated = await Task.findOneAndUpdate({ _id: taskId }, data, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ------------------------- Delete Task (Current User) -------------------------
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: userId,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Task not found or not yours" });

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------- Admin Delete Task -------------------------
export const adminDeleteTask = async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(
      req.params.taskId || req.params.id
    );
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
