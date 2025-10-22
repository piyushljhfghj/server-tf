// // fixPasswords.js
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import User from "./models/userModel.js";

// dotenv.config();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/yourDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const fixUsers = async () => {
//   try {
//     const users = await User.find({ $or: [{ password: { $exists: false } }, { password: null }] });

//     if (users.length === 0) {
//       console.log("✅ All users already have passwords.");
//       process.exit();
//     }

//     for (const user of users) {
//       let defaultPassword;

//       // For Google users, use UID as password fallback
//       if (user.googleId) {
//         defaultPassword = user.googleId;
//       } else {
//         // Otherwise, generate a temporary password
//         defaultPassword = "Temp12345!";
//       }

//       // Hash the password
//       const hashed = await bcrypt.hash(defaultPassword, 10);
//       user.password = hashed;

//       await user.save();
//       console.log(`✅ Password fixed for: ${user.email}`);
//     }

//     console.log("✅ All missing passwords are now hashed!");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Error fixing passwords:", err);
//     process.exit(1);
//   }
// };

// fixUsers();




// -------------------------------------------------------------

// fixPasswords.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/yourDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixUsers = async () => {
  try {
    const users = await User.find({ $or: [{ password: { $exists: false } }, { password: null }] });

    if (users.length === 0) {
      console.log("✅ All users already have passwords.");
      process.exit();
    }

    for (const user of users) {
      let defaultPassword;

      // For Google users, use UID as password fallback
      if (user.googleId) {
        defaultPassword = user.googleId;
      } else {
        // Otherwise, generate a temporary password
        defaultPassword = "Temp12345!";
      }

      // Hash the password
      const hashed = await bcrypt.hash(defaultPassword, 10);
      user.password = hashed;

      await user.save();
      console.log(`✅ Password fixed for: ${user.email}`);
    }

    console.log("✅ All missing passwords are now hashed!");
    process.exit();
  } catch (err) {
    console.error("❌ Error fixing passwords:", err);
    process.exit(1);
  }
};

fixUsers();
