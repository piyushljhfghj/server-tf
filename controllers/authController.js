import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../utils/sendEmail.js";

// Generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const user = await User.create({
      name,
      email,
      password: hashed,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 mins
    });

    await sendOtpEmail(email, otp);
    res.json({ msg: "OTP sent to email", email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOtpEmail(email, otp);
    res.json({ msg: "OTP sent to email", email });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ msg: "Verified successfully", token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


