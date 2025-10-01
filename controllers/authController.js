import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// -------------------- SEND OTP --------------------
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate OTP as string (important for consistency)
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP in user document
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Taskflow <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Taskflow OTP Verification",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    // For debugging: log OTP in backend console (remove in production)
    console.log(`✅ OTP sent to ${email}: ${otp}`);

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Error in sendOtp:", err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};

// -------------------- VERIFY OTP --------------------
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp) {
      return res.status(400).json({ msg: "No OTP sent" });
    }

    // Check expiry
    if (new Date() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Compare OTP as strings
    if (otp !== user.otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    // OTP correct → generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ msg: "OTP verified", token });
  } catch (err) {
    console.error("❌ Error in verifyOtp:", err);
    res.status(500).json({ msg: "OTP verification failed" });
  }
};
