
// // backend/server.js
// import express from "express";
// import cors from "cors";
// import 'dotenv/config';
// import { connectDB } from "./config/db.js";
// import googleAuthRouter from "./routes/googleAuth.js";
// import userRouter from "./routes/userRoutes.js";
// import taskRouter from "./routes/taskRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import User from "./models/userModel.js";
// import bcrypt from "bcryptjs";
// import adminTaskRoutes from "./routes/adminTaskRoutes.js";



// const app = express();
// const port = process.env.PORT || 4000;

// // ✅ Allowed Origins for CORS
// const allowedOrigins = [
//   "http://localhost:5173",                  // Local frontend
//   "https://taskflow-frontend-nine.vercel.app" // Vercel frontend
// ];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
//     callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true // allows sending cookies/auth headers
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));




// // Database Connection
// connectDB();// In server.js, after connectDB()


// const createAdmin = async () => {
//   const adminEmail = "piyush.3035kvsrodelhi@gmail.com";
//   const exists = await User.findOne({ email: adminEmail });
//   if (!exists) {
//     const hashed = await bcrypt.hash("paadkha", 10);
//     await User.create({
//       name: "Super Admin",
//       email: adminEmail,
//       password: hashed,
//       role: "admin",
//       isVerified: true,
//     });
//     console.log("✅ Default admin created:", adminEmail);
//   }
// };
// createAdmin();




// // Routes
// app.use("/api/user", userRouter);
// app.use("/api/tasks", taskRouter);
// app.use("/api/auth/google", googleAuthRouter);
// app.use("/api/auth", authRoutes); // must exist and be after express.json()
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin", adminTaskRoutes);


// // Test API
// app.get("/", (req, res) => {
//   res.send("✅ API is Working");
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`🚀 Server Started on http://localhost:${port}`);
// });






// ---------------------------------------------------





// backend/server.js
import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import googleAuthRouter from "./routes/googleAuth.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import User from "./models/userModel.js";
import bcrypt from "bcryptjs";
import adminTaskRoutes from "./routes/adminTaskRoutes.js";
import ForgotPasswordRoutes from "./routes/ForgotPasswordRoutes.js"; // 🆕 Added



const app = express();
const port = process.env.PORT || 4000;

// ✅ Allowed Origins for CORS
const allowedOrigins = [
  "http://localhost:5173",                  // Local frontend
  "https://taskflow-frontend-nine.vercel.app" // Vercel frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true // allows sending cookies/auth headers
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Database Connection
connectDB();// In server.js, after connectDB()


const createAdmin = async () => {
  const adminEmail = "aeerohit@gmail.com";
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    const hashed = await bcrypt.hash("paadkha", 10);
    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashed,
      role: "admin",
      isVerified: true,
    });
    console.log("✅ Default admin created:", adminEmail);
  }
};
createAdmin();




// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/auth/google", googleAuthRouter);
app.use("/api/auth", authRoutes); // must exist and be after express.json()
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminTaskRoutes);
app.use("/api/auth", ForgotPasswordRoutes); // 🆕 Added


// Test API
app.get("/", (req, res) => {
  res.send("✅ API is Working");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});



