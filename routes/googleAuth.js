// backend/routes/googleAuth.js
import express from "express";
import jwt from "jsonwebtoken";
import admin from "../firebaseAdmin.js"; // Firebase Admin SDK
import User from "../models/userModel.js";

const router = express.Router();

// Unified Google auth route
router.post("/", async (req, res) => {
  const { token } = req.body; // Firebase ID token from frontend

  if (!token) {
    return res.status(400).json({ success: false, message: "Token missing" });
  }

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture } = decodedToken;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({ name, email, avatar: picture });
    }

    // Issue your backend JWT
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      message: "Google auth successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ success: false, message: "Google auth failed" });
  }
});

export default router;
