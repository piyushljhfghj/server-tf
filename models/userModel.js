

// // ✅ models/userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, required: true, unique: true },
//     password: String,
//     googleId: String,
//     avatar: String,
//     otp: String,
//     otpExpiry: Date,
//     isVerified: { type: Boolean, default: false },
//     role: { type: String, enum: ["user", "admin"], default: "user" }, // ✅ added
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);



// --------------------------------------------------



// ✅ models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    googleId: String,
    avatar: String,
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // ✅ added
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
