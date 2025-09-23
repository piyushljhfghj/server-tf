// // backend/server.js
// import express from "express";
// import cors from "cors";
// import 'dotenv/config'
// import { connectDB } from "./config/db.js";



// import userRouter from "./routes/userRoute.js";
// import taskRouter from "./routes/taskRoute.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Database Connection
// connectDB();

// // Routes
// app.use("/api/user", userRouter);
// app.use("/api/tasks", taskRouter);

// app.get("/", (req, res) => {
//   res.send("✅ API is Working");
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`🚀 Server Started on http://localhost:${port}`);
// });




// backend/server.js
import express from "express";
import cors from "cors";
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import googleAuthRouter from "./routes/googleAuth.js";


import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);
// New Google auth
app.use("/api/auth/google", googleAuthRouter);

app.get("/", (req, res) => {
  res.send("✅ API is Working");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
