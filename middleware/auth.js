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
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export default async function authMiddleware(req, res, next) {
  try {
    // 🔑 Grab the JWT from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // 🔑 Verify your JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔑 Find user from DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
