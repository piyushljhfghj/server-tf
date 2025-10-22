


// // -------------------------------------------------------------------
// import express from "express";
// import {
//   verifyOtp,
//   sendOtp,
//   googleSignup,
//   googleLogin,
//   loginOtpSend,
//   loginOtpVerify,
//   getUserDashboard,
// } from "../controllers/authController.js";

// import {
//   getAllUsers,
//   getUserTasks,
//   createUserTask,
//   editUserTask,
//   deleteUserTask,
//   deleteUser,
//   updateUserRole,
// } from "../controllers/adminController.js";

// import authMiddleware from "../middleware/auth.js";
// import { loginUser } from "../controllers/userController.js";

// const router = express.Router();

// // -------------------- Signup & Login Routes --------------------
// router.post("/signup/google", googleSignup);
// router.post("/signup/send-otp", sendOtp);
// router.post("/signup/verify-otp", verifyOtp);

// router.post("/login/google", googleLogin);
// router.post("/login/send-otp", loginOtpSend);
// router.post("/login/verify-otp", loginOtpVerify);
// router.post("/login", loginUser); 
// // -------------------- User Dashboard --------------------
// router.get("/dashboard", authMiddleware, getUserDashboard);

// // -------------------- Admin Routes --------------------
// router.get("/admin/users", authMiddleware, getAllUsers);
// router.get("/admin/users/:userId/tasks", authMiddleware, getUserTasks);
// router.post("/admin/users/:userId/tasks", authMiddleware, createUserTask);
// router.put("/admin/users/:userId/tasks/:taskId", authMiddleware, editUserTask);
// router.delete("/admin/users/:userId/tasks/:taskId", authMiddleware, deleteUserTask);
// router.delete("/admin/users/:userId", authMiddleware, deleteUser);
// router.put("/admin/users/:userId/role", authMiddleware, updateUserRole);

// export default router;



// --------------------------------------------




// -------------------------------------------------------------------
import express from "express";
import {
  verifyOtp,
  sendOtp,
  googleSignup,
  googleLogin,
  loginOtpSend,
  loginOtpVerify,
  getUserDashboard,
} from "../controllers/authController.js";

import {
  getAllUsers,
  getUserTasks,
  createUserTask,
  editUserTask,
  deleteUserTask,
  deleteUser,
  updateUserRole,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/auth.js";
import { loginUser } from "../controllers/userController.js";

const router = express.Router();

// -------------------- Signup & Login Routes --------------------
router.post("/signup/google", googleSignup);
router.post("/signup/send-otp", sendOtp);
router.post("/signup/verify-otp", verifyOtp);

router.post("/login/google", googleLogin);
router.post("/login/send-otp", loginOtpSend);
router.post("/login/verify-otp", loginOtpVerify);
router.post("/login", loginUser); 
// -------------------- User Dashboard --------------------
router.get("/dashboard", authMiddleware, getUserDashboard);

// -------------------- Admin Routes --------------------
router.get("/admin/users", authMiddleware, getAllUsers);
router.get("/admin/users/:userId/tasks", authMiddleware, getUserTasks);
router.post("/admin/users/:userId/tasks", authMiddleware, createUserTask);
router.put("/admin/users/:userId/tasks/:taskId", authMiddleware, editUserTask);
router.delete("/admin/users/:userId/tasks/:taskId", authMiddleware, deleteUserTask);
router.delete("/admin/users/:userId", authMiddleware, deleteUser);
router.put("/admin/users/:userId/role", authMiddleware, updateUserRole);

export default router;
