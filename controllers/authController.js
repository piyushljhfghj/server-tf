

// // ------------------------------------------------------------------------------------------------
// // backend/controllers/authController.js
// import nodemailer from "nodemailer";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";
// import admin from "../firebaseAdmin.js";

// const ADMIN_EMAILS = ["piyush.3035kvsrodelhi@gmail.com"];
// const JWT_SECRET = process.env.JWT_SECRET || "paadkha";

// // -------------------- Utility: Mail Transporter --------------------
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // -------------------- SEND OTP (Signup) --------------------
// export const sendOtp = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });

//     if (user && user.isVerified) {
//       return res.status(400).json({ msg: "User already exists. Please login." });
//     }

//     if (!user) {
//       user = new User({ name, email, password: password ? await bcrypt.hash(password, 10) : undefined, isVerified: false });
//     }

//     const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
//     user.otp = otp;
//     user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
//     await user.save();

//     await transporter.sendMail({
//       from: `TaskFlow <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "TaskFlow OTP Verification",
//       text: `Hello ${name},\n\nYour OTP is ${otp}. It will expire in 5 minutes.`,
//     });

//     res.json({ msg: "OTP sent successfully" });
//   } catch (err) {
//     console.error("❌ Error in sendOtp:", err);
//     res.status(500).json({ msg: "Failed to send OTP" });
//   }
// };

// // -------------------- VERIFY OTP (Signup Complete) --------------------
// export const verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.otp) return res.status(400).json({ msg: "No OTP requested" });

//     if (new Date() > user.otpExpiry) {
//       user.otp = null;
//       user.otpExpiry = null;
//       await user.save();
//       return res.status(400).json({ msg: "OTP expired" });
//     }

//     if (otp !== user.otp) return res.status(400).json({ msg: "Invalid OTP" });

//     user.otp = null;
//     user.otpExpiry = null;
//     user.isVerified = true;
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

//     res.json({ msg: "OTP verified successfully", token, user });
//   } catch (err) {
//     console.error("❌ Error in verifyOtp:", err);
//     res.status(500).json({ msg: "OTP verification failed" });
//   }
// };

// // -------------------- GOOGLE SIGNUP --------------------
// export const googleSignup = async (req, res) => {
//   try {
//     const { token } = req.body;
//     if (!token) return res.status(400).json({ message: "No token provided" });

//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const { email, name, uid, picture } = decodedToken;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User exists. Please login." });

//     const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";
//     const hashedPassword = await bcrypt.hash(uid, 10);

//     user = await User.create({
//       name,
//       email,
//       password: hashedPassword, // ✅ hashed
//       googleId: uid,
//       avatar: picture,
//       isVerified: true,
//       role,
//     });

//     const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
//     res.status(200).json({ token: jwtToken, user });
//   } catch (error) {
//     console.error("Error googleSignup:", error);
//     res.status(400).json({ message: "Google signup failed" });
//   }
// };

// // -------------------- GOOGLE LOGIN --------------------
// export const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const { email, uid } = decodedToken;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "No account found. Please signup." });

//     // Ensure admin role is assigned if email is in admin list
//     if (ADMIN_EMAILS.includes(email) && user.role !== "admin") {
//       user.role = "admin";
//     }

//     // Ensure password exists and is hashed
//     if (!user.password) {
//       user.password = await bcrypt.hash(uid, 10);
//     }

//     await user.save();

//     const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

//     res.json({ msg: "Login successful", token: jwtToken, user });
//   } catch (err) {
//     console.error("Error googleLogin:", err);
//     res.status(500).json({ msg: "Google login failed" });
//   }
// };

// // -------------------- LOGIN WITH OTP --------------------
// export const loginOtpSend = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isVerified) return res.status(400).json({ msg: "User not found. Please signup." });

//     const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
//     user.otp = otp;
//     user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
//     await user.save();

//     await transporter.sendMail({
//       from: `TaskFlow <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "TaskFlow OTP Login",
//       text: `Hello,\n\nYour login OTP is ${otp}. It will expire in 5 minutes.`,
//     });

//     res.json({ msg: "OTP sent for login" });
//   } catch (err) {
//     console.error("❌ Error in loginOtpSend:", err);
//     res.status(500).json({ msg: "Failed to send login OTP" });
//   }
// };

// export const loginOtpVerify = async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.otp) return res.status(400).json({ msg: "No OTP requested" });

//     if (new Date() > user.otpExpiry) {
//       user.otp = null;
//       user.otpExpiry = null;
//       await user.save();
//       return res.status(400).json({ msg: "OTP expired" });
//     }

//     if (otp !== user.otp) return res.status(400).json({ msg: "Invalid OTP" });

//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
//     res.json({ msg: "Login successful", token, user });
//   } catch (err) {
//     console.error("❌ Error in loginOtpVerify:", err);
//     res.status(500).json({ msg: "Login failed" });
//   }
// };

// // -------------------- USER DASHBOARD --------------------
// export const getUserDashboard = async (req, res) => {
//   try {
//     const user = req.user;
//     res.status(200).json({
//       success: true,
//       message: "User dashboard data fetched successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error });
//   }
// };




// ------------------------------------------------------------





// ------------------------------------------------------------------------------------------------
// backend/controllers/authController.js
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import admin from "../firebaseAdmin.js";

const ADMIN_EMAILS = ["piyush.3035kvsrodelhi@gmail.com"];
const JWT_SECRET = process.env.JWT_SECRET || "paadkha";

// -------------------- Utility: Mail Transporter --------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// -------------------- SEND OTP (Signup) --------------------
export const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ msg: "User already exists. Please login." });
    }

    if (!user) {
      user = new User({ name, email, password: password ? await bcrypt.hash(password, 10) : undefined, isVerified: false });
    }

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: `TaskFlow <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "TaskFlow OTP Verification",
      text: `Hello ${name},\n\nYour OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Error in sendOtp:", err);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};

// -------------------- VERIFY OTP (Signup Complete) --------------------
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp) return res.status(400).json({ msg: "No OTP requested" });

    if (new Date() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (otp !== user.otp) return res.status(400).json({ msg: "Invalid OTP" });

    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ msg: "OTP verified successfully", token, user });
  } catch (err) {
    console.error("❌ Error in verifyOtp:", err);
    res.status(500).json({ msg: "OTP verification failed" });
  }
};

// -------------------- GOOGLE SIGNUP --------------------
export const googleSignup = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "No token provided" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, uid, picture } = decodedToken;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User exists. Please login." });

    const role = ADMIN_EMAILS.includes(email) ? "admin" : "user";
    const hashedPassword = await bcrypt.hash(uid, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword, // ✅ hashed
      googleId: uid,
      avatar: picture,
      isVerified: true,
      role,
    });

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token: jwtToken, user });
  } catch (error) {
    console.error("Error googleSignup:", error);
    res.status(400).json({ message: "Google signup failed" });
  }
};

// -------------------- GOOGLE LOGIN --------------------
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, uid } = decodedToken;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No account found. Please signup." });

    // Ensure admin role is assigned if email is in admin list
    if (ADMIN_EMAILS.includes(email) && user.role !== "admin") {
      user.role = "admin";
    }

    // Ensure password exists and is hashed
    if (!user.password) {
      user.password = await bcrypt.hash(uid, 10);
    }

    await user.save();

    const jwtToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ msg: "Login successful", token: jwtToken, user });
  } catch (err) {
    console.error("Error googleLogin:", err);
    res.status(500).json({ msg: "Google login failed" });
  }
};

// -------------------- LOGIN WITH OTP --------------------
export const loginOtpSend = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(400).json({ msg: "User not found. Please signup." });

    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: `TaskFlow <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "TaskFlow OTP Login",
      text: `Hello,\n\nYour login OTP is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ msg: "OTP sent for login" });
  } catch (err) {
    console.error("❌ Error in loginOtpSend:", err);
    res.status(500).json({ msg: "Failed to send login OTP" });
  }
};

export const loginOtpVerify = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp) return res.status(400).json({ msg: "No OTP requested" });

    if (new Date() > user.otpExpiry) {
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (otp !== user.otp) return res.status(400).json({ msg: "Invalid OTP" });

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ msg: "Login successful", token, user });
  } catch (err) {
    console.error("❌ Error in loginOtpVerify:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};

// -------------------- USER DASHBOARD --------------------
export const getUserDashboard = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "User dashboard data fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


