import express from "express";
import { verifyOtp, sendOtp } from "../controllers/authController.js";
const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
router.post("/send-otp", sendOtp);     // <-- new route
router.post("/verify-otp", verifyOtp);

export default router;
