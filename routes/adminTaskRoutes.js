// import express from "express";
// import {
//   getTasksForUser,
//   createTaskForUser,
//   adminUpdateTaskForUser,
//   adminDeleteTask,
// } from "../controllers/taskController.js";
// import authMiddleware from "../middleware/auth.js";

// const router = express.Router();

// // ✅ Fetch all tasks for a specific user
// router.get("/users/:userId/tasks", authMiddleware, getTasksForUser);

// // ✅ Create new task for a specific user (admin)
// router.post("/users/:userId/tasks", authMiddleware, createTaskForUser);

// // ✅ Update a task for a specific user
// router.put("/users/:userId/tasks/:taskId", authMiddleware, adminUpdateTaskForUser);

// // ✅ Delete a specific user's task
// router.delete("/users/:userId/tasks/:taskId", authMiddleware, adminDeleteTask);

// export default router;






// -----------------------------------------




import express from "express";
import {
  getTasksForUser,
  createTaskForUser,
  adminUpdateTaskForUser,
  adminDeleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ Fetch all tasks for a specific user
router.get("/users/:userId/tasks", authMiddleware, getTasksForUser);

// ✅ Create new task for a specific user (admin)
router.post("/users/:userId/tasks", authMiddleware, createTaskForUser);

// ✅ Update a task for a specific user
router.put("/users/:userId/tasks/:taskId", authMiddleware, adminUpdateTaskForUser);

// ✅ Delete a specific user's task
router.delete("/users/:userId/tasks/:taskId", authMiddleware, adminDeleteTask);

export default router;
