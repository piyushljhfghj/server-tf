// import express from 'express';
// import {
//     registerUser,
//     loginUser,
//     getCurrentUser,
//     updateProfile,
//     updatePassword,
// } from '../controllers/userController.js';
// import authMiddleware from '../middleware/auth.js';

// const userRouter = express.Router();

// // Public
// userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);

// // Protected
// userRouter.get('/me', authMiddleware, getCurrentUser);
// userRouter.put('/profile', authMiddleware, updateProfile);
// userRouter.put('/password', authMiddleware, updatePassword);

// export default userRouter;


import express from 'express';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    updatePassword,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// Public
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected
userRouter.get('/me', authMiddleware, getCurrentUser);
userRouter.put('/profile', authMiddleware, updateProfile);
userRouter.put('/password', authMiddleware, updatePassword);
// GET /api/user/me
// Extra route (if you want to keep it in addition to controller one)
userRouter.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get user", error: err.message });
  }
});



export default userRouter;