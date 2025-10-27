// 🆕 backend/routes/forgotPasswordRoutes.js
import express from "express";
import { sendForgotPasswordOtp, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// 🆕 Route to send OTP when user forgets password
router.post("/forgot-password", sendForgotPasswordOtp);

// 🆕 Route to verify OTP and reset password
router.post("/reset-password", resetPassword);

export default router;
