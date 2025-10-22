

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
//    getAllTasks,
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
// // ✅ Get all tasks from all users
// router.get("/tasks", authMiddleware, isAdmin, getAllTasks);

// // ---------------- DASHBOARD DATA ----------------


// export default router;



// -----------------------------------------------





// backend/routes/adminRoutes.js
import express from "express";
import {
  getAllUsers,
  getUserTasks,
  createUserTask,
  editUserTask,
  deleteUserTask,
  updateUserRole,
  getUserDashboard,
  deleteUser,
   getAllTasks,
} from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// ---------------- USER MANAGEMENT ----------------
router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.delete("/users/:userId", authMiddleware, isAdmin, deleteUser);
router.put("/users/:userId/role", authMiddleware, isAdmin, updateUserRole);

// ---------------- TASK MANAGEMENT ----------------
router.get("/users/:userId/tasks", authMiddleware, isAdmin, getUserTasks);
router.post("/users/:userId/tasks", authMiddleware, isAdmin, createUserTask);
router.put("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, editUserTask);
router.delete("/users/:userId/tasks/:taskId", authMiddleware, isAdmin, deleteUserTask);
// ✅ Get all tasks from all users
router.get("/tasks", authMiddleware, isAdmin, getAllTasks);

// ---------------- DASHBOARD DATA ----------------


export default router;
