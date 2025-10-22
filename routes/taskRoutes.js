


// // // export default taskRouter
// import express from 'express';
// import {
//   createTask,
//   getTasks,
//   getTaskById,
//   updateTask,
//   deleteTask,
//   getTasksForGP,
//   createTaskForUser
// } from '../controllers/taskController.js';
// import authMiddleware  from '../middleware/auth.js';

// const router = express.Router();

// // ✅ Route for global (public) tasks
// router.get('/gp', getTasksForGP);


// // ✅ Routes for user tasks
// router.get('/', authMiddleware, getTasks);
// router.post('/', authMiddleware, createTask);
// router.get('/:taskId', authMiddleware, getTaskById);
// router.put('/:id', authMiddleware, updateTask);
// router.delete('/:id', authMiddleware, deleteTask);

// export default router;



// -------------------------------------------






// // export default taskRouter
import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksForGP,
  createTaskForUser
} from '../controllers/taskController.js';
import authMiddleware  from '../middleware/auth.js';

const router = express.Router();

// ✅ Route for global (public) tasks
router.get('/gp', getTasksForGP);


// ✅ Routes for user tasks
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.get('/:taskId', authMiddleware, getTaskById);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
