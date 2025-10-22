// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const JWT_SECRET = process.env.JWT_SECRET || "paadkha";

// // ✅ Auth middleware
// export default async function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ success: false, message: "No token provided." });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // ✅ Fetch user to verify existence
//     const user = await User.findById(decoded.id).select("_id email role");
//     if (!user) {
//       return res.status(401).json({ success: false, message: "User not found." });
//     }

//     // ✅ Attach both _id and id for compatibility
//     req.user = {
//       _id: user._id,
//       id: user._id.toString(),
//       email: user.email,
//       role: user.role,
//     };

//     next();
//   } catch (err) {
//     console.error("Auth Middleware Error:", err.message);
//     return res.status(401).json({ success: false, message: "Invalid or expired token." });
//   }
// }

// // ✅ Admin-only route protection
// export const adminMiddleware = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Admin access required." });
//     }
//     next();
//   } catch (err) {
//     console.error("Admin middleware error:", err.message);
//     res.status(500).json({ success: false, message: "Server error." });
//   }
// };







// -------------------------------------------------






import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "paadkha";

// ✅ Auth middleware
export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // ✅ Fetch user to verify existence
    const user = await User.findById(decoded.id).select("_id email role");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found." });
    }

    // ✅ Attach both _id and id for compatibility
    req.user = {
      _id: user._id,
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
}

// ✅ Admin-only route protection
export const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required." });
    }
    next();
  } catch (err) {
    console.error("Admin middleware error:", err.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
