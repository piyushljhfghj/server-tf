// import User from "../models/userModel.js";
// import Task from "../models/taskModel.js";

// // -------------------- Get all users --------------------
// export const getAllUsers = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const users = await User.find().select("-password -otp -otpExpiry");
//     res.status(200).json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- Get tasks of a specific user --------------------
// export const getUserTasks = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const userId = req.params.userId;
//     const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, tasks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- Edit a specific user's task --------------------
// export const editUserTask = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const { userId, taskId } = req.params;
//     const { title, description, status } = req.body;

//     const task = await Task.findOneAndUpdate(
//       { _id: taskId, owner: userId },
//       { title, description, status },
//       { new: true }
//     );

//     if (!task) {
//       return res.status(404).json({ success: false, message: "Task not found" });
//     }

//     res.status(200).json({ success: true, task });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- Delete a specific user's task --------------------
// export const deleteUserTask = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const { userId, taskId } = req.params;

//     const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
//     if (!task) {
//       return res.status(404).json({ success: false, message: "Task not found" });
//     }

//     res.status(200).json({ success: true, message: "Task deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- Delete a user completely --------------------
// export const deleteUser = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const userId = req.params.userId;
//     await User.findByIdAndDelete(userId);
//     await Task.deleteMany({ owner: userId }); // delete all their tasks
//     res.status(200).json({ success: true, message: "User and tasks deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- Update user role --------------------
// export const updateUserRole = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const userId = req.params.userId;
//     const { role } = req.body; // role can be "user" or "admin"
//     if (!["user", "admin"].includes(role)) {
//       return res.status(400).json({ success: false, message: "Invalid role" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { role },
//       { new: true }
//     ).select("-password -otp -otpExpiry");

//     res.status(200).json({ success: true, user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



// backend/controllers/adminController.js
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import authMiddleware from "../middleware/auth.js";
// -------------------- Get all users --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry");
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- Get tasks of a specific user --------------------
export const getUserTasks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ owner: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- Create a task for a specific user (ADMIN) --------------------
export const createUserTask = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, description, priority, dueDate, subtasks } = req.body;

    // Basic validation
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const newTask = await Task.create({
      title,
      description: description || "",
      priority: priority || "Low",
      dueDate: dueDate ? new Date(dueDate) : null,
      subtasks: Array.isArray(subtasks) ? subtasks : [],
      owner: userId, // ✅ ADDED: set owner to the chosen user
    });

    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    console.error("createUserTask error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- Edit a specific user's task --------------------
export const editUserTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, owner: userId },
      updates,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- Delete a specific user's task --------------------
export const deleteUserTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- Delete a user completely --------------------
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    await Task.deleteMany({ owner: req.params.userId }); // delete user tasks
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};


// ✅ Get dashboard data for a specific user
export const getUserDashboard = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.params.userId });
    res.json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user dashboard" });
  }
};


// -------------------- Update user role --------------------
export const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-password -otp -otpExpiry");

    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
