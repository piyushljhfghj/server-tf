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
import admin from "../firebaseAdmin.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export default async function authMiddleware(req, res, next) {
  try {
    const idToken = req.body.token || req.headers.authorization?.split(" ")[1];
    if (!idToken) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // 🔑 Verify Google/Firebase token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      user = await User.create({
        name: decodedToken.name || "Google User",
        email: decodedToken.email,
        avatar: decodedToken.picture,
      });
    }

    // 🔑 Issue your own JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    req.user = user;
    req.authToken = token;
    next();
  } catch (err) {
    console.error("Firebase token verification failed:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
