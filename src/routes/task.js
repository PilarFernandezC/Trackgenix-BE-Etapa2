import express from 'express';
import {
  deleteTask, updateTask, getOneTask,
} from '../controllers/task';
import updateTaskValidation from '../validations/task';

const router = express.Router();

router
  .delete('/:id', deleteTask)
  .get('/:id', getOneTask)
  .put('/:id', updateTaskValidation, updateTask);

export default router;
