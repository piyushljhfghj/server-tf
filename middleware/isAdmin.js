

// import User from "../models/userModel.js";

// export const isAdmin = async (req, res, next) => {
//   const user = await User.findById(req.user.id);
//   if (!user || user.role !== "admin") {
//     return res.status(403).json({ success: false, message: "Admin access required." });
//   }
//   next();
// };


// ---------------------------------------




import User from "../models/userModel.js";

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required." });
  }
  next();
};
