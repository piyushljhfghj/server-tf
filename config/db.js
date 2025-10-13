// // db.js

// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   await mongoose.connect('mongodb+srv://piyush:rawat1807@cluster0.pny6vjq.mongodb.net/INTERN')
//  .then (() => (`Connected to MongoDB`));
// }



// ✅ config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
