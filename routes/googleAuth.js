// // backend/routes/googleAuth.js
// import express from "express";
// import admin from "../firebaseAdmin.js";
// import User from "../models/userModel.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { token } = req.body;

//     // ✅ Verify Firebase token
//     const decoded = await admin.auth().verifyIdToken(token);
//     const { uid, email, name, picture } = decoded;

//     // ✅ Find or create user
//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({
//         name: name || "Google User",
//         email,
//         googleId: uid,
//         avatar: picture,
//       });
//     }

//     // ✅ Generate your own JWT for session
//     const myToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ success: true, token: myToken, user });
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ success: false, message: "Invalid Google token" });
//   }
// });

// export default router;
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// Google SIGNUP (no token issued)
router.post("/signup", async (req, res) => {
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      await User.create({ name, email });
      return res.json({ success: true, message: "Signup successful. Please login." });
    }

    return res.json({ success: false, message: "User already exists. Please login." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// Google LOGIN (token issued)
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found. Please sign up." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Login failed" });
  }
});

export default router;
