
// // backend/models/userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String }, // ❌ not required for Google users
//   googleId: { type: String }, // 🔹 store Firebase UID
//   avatar: { type: String },   // 🔹 Google profile picture
  
// }, { timestamps: true });

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;



// // backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // ❌ not required for Google users
  googleId: { type: String }, // 🔹 store Firebase UID
  avatar: { type: String },   // 🔹 Google profile picture
  otp: { type: String },
otpExpiry: { type: Date },
isVerified: { type: Boolean, default: false },

}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
