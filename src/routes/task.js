import express from 'express';
// import validations from '../validations/task';
import {
  deleteTask, editTask, getAll, getTaskById,
} from '../controllers/task';
// import { updateTaskValidation } from '../validations/task';

const router = express.Router();

router
  .delete('/:id', deleteTask)
//   .post('/', createTask)
  .get('/:id', getTaskById)
  .put('/:id', editTask)
  .get('/', getAll);

export default router;
