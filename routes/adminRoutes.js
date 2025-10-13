// import express from "express";
// import { getAllUsers, getUserTasks, editUserTask, deleteUserTask, updateUserRole } from "../controllers/adminController.js";
// import authMiddleware from "../middleware/auth.js";
// import { isAdmin } from "../middleware/isAdmin.js";

// const router = express.Router();

// router.get("/users", authMiddleware, isAdmin, getAllUsers);
// router.get("/users/:userId/tasks", authMiddleware, isAdmin, getUserTasks);
// router.put("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, editUserTask);
// router.delete("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, deleteUserTask);
// router.put("/users/:userId/role", authMiddleware, isAdmin, updateUserRole);

// export default router;




import express from "express";
import {
  getAllUsers,
  getUserTasks,
  editUserTask,
  deleteUserTask,
  updateUserRole,
  getUserDashboard, 
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import Task from "../models/taskModel.js"; // ✅ Added for creating new task
import { deleteUser } from "../controllers/adminController.js";


const router = express.Router();

router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.get("/users/:userId/tasks", authMiddleware, isAdmin, getUserTasks);
router.put("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, editUserTask);
router.get("/users/:userId/dashboard", authMiddleware, isAdmin, getUserDashboard);
router.delete("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, deleteUserTask);
router.put("/users/:userId/role", authMiddleware, isAdmin, updateUserRole);
router.delete("/users/:userId", authMiddleware, isAdmin, deleteUser);

export default router;



// // backend/routes/adminRoutes.js
// import express from "express";
// import {
//   getAllUsers,
//   getUserTasks,
//   createUserTask,
//   editUserTask,
//   deleteUserTask,
//   updateUserRole,
//   getUserDashboard,
//   deleteUser,
// } from "../controllers/adminController.js";
// import authMiddleware from "../middleware/auth.js";
// import { isAdmin } from "../middleware/isAdmin.js";

// const router = express.Router();

// // ---------------- USER MANAGEMENT ----------------
// router.get("/users", authMiddleware, isAdmin, getAllUsers);
// router.delete("/users/:userId", authMiddleware, isAdmin, deleteUser);
// router.put("/users/:userId/role", authMiddleware, isAdmin, updateUserRole);

// // ---------------- TASK MANAGEMENT ----------------
// router.get("/users/:userId/tasks", authMiddleware, isAdmin, getUserTasks);
// router.post("/users/:userId/tasks", authMiddleware, isAdmin, createUserTask);
// router.put("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, editUserTask);
// router.delete("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, deleteUserTask);

// // ---------------- DASHBOARD DATA ----------------


// export default router;
