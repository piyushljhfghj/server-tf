// // backend/middleware/isAdmin.js
// export const isAdmin = (req, res, next) => {
//   try {
//     if (req.user?.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Access denied: Admins only" });
//     }
//     next();
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Authorization error" });
//   }
// };

import User from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required." });
  }
  next();
};
