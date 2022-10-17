import express from 'express';
// import validations from '../validations/task';
import {
  deleteTask, editTask, getAll, getTaskById, createTask
} from '../controllers/task';
import Task from '../models/Task';

const router = express.Router();

router
    .delete('/:id', deleteTask)
    .post('/', createTask)
    .get('/:id', getTaskById)
    .put('/:id', editTask)
    .get('/', getAll);

export default router;
