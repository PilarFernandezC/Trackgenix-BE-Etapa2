import express from 'express';
// import validations from '../validations/task';
import {
  deleteTask, updateTask, getOneTask,
} from '../controllers/task';
// import { updateTaskValidation } fr|om '../validations/task';

const router = express.Router();

router
  .delete('/:id', deleteTask)
  .get('/:id', getOneTask)
  .put('/:id', updateTask)

export default router;
