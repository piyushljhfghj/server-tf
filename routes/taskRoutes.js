
// // import express from 'express';
// // import {
// //     createTask,
// //     getTasks,
// //     getTaskById,
// //     updateTask,
// //     deleteTask
// // } from '../controllers/taskController.js';
// // import authMiddleware from '../middleware/auth.js';

// // const taskRouter = express.Router();

// // taskRouter.route('/gp')
// //     .get(authMiddleware, getTasks)
// //     .post(authMiddleware, createTask);

// // taskRouter.route('/:id/gp')
// //     .get(authMiddleware, getTaskById)
// //     .put(authMiddleware, updateTask)
// //     .delete(authMiddleware, deleteTask);

// // export default taskRouter
import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksForGP
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
