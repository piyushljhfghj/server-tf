import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

// ---------------- OTP SENDER ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // app password
  },
});

const sendOtpMail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for TaskFlow",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
};

// ---------------- JWT GENERATOR ----------------
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ---------------- SIGNUP ----------------
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(409).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins

    user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await user.save();
    await sendOtpMail(email, otp);

    res.status(200).json({ msg: "OTP sent to email. Please verify." });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();
    await sendOtpMail(email, otp);

    res.status(200).json({ msg: "OTP sent to email" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- VERIFY OTP ----------------
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
