// // backend/middleware/auth.js
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'paadkha';

// export default async function authMiddleware(req, res, next) {
//     // 1. Grab the Bearer token from Authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res
//             .status(401)
//             .json({ success: false, message: 'Not authorized, token missing' });
//     }
//     const token = authHeader.split(' ')[1];

//     // 2. Verify & attach user object
//     try {
//         const payload = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(payload.id).select('-password');
//         if (!user) {
//             return res
//                 .status(401)
//                 .json({ success: false, message: 'User not found' });
//         }
//         req.user = user;
//         next();
//     } catch (err) {
//         console.error('JWT verification failed:', err);
//         return res
//             .status(401)
//             .json({ success: false, message: 'Token invalid or expired' });
//     }
// }

// backend/middleware/auth.js
import express from "express";
import admin from "../firebaseAdmin.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/google", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name: name || email.split("@")[0], email, password: "" });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token: jwtToken, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ msg: "Google authentication failed" });
  }
});

export default router;
