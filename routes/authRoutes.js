// import express from "express";
// import { verifyOtp, sendOtp, } from "../controllers/authController.js";
// import { googleAuth } from '../controllers/authController.js'; // ✅ Import the controller
// const router = express.Router();



// // router.post("/register", registerUser);
// // router.post("/login", loginUser);
// router.post('/google', googleAuth);
// router.post("/send-otp", sendOtp);     // <-- new route
// router.post("/verify-otp", verifyOtp);

// export default router;




// // backend/routes/authRoutes.js

// import express from "express";
// import { verifyOtp, sendOtp, googleAuth, registerUser } from "../controllers/authController.js";

// const router = express.Router();

// // Normal email/password signup
// router.post("/register", registerUser);

// // Google signup
// router.post("/google", googleAuth);

// // OTP routes
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);

// export default router;


// import express from "express";
// import { verifyOtp, sendOtp, googleAuth } from "../controllers/authController.js";

// const router = express.Router();

// // Google signup
// router.post("/google", googleAuth);

// // OTP signup flow
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);

// export default router;



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
