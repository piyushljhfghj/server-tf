// backend/routes/googleAuth.js
import express from "express";
import admin from "../firebaseAdmin.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { token } = req.body;

    // ✅ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decoded;

    // ✅ Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        googleId: uid,
        avatar: picture,
      });
    }

    // ✅ Generate your own JWT for session
    const myToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token: myToken, user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
});

export default router;
