import express from 'express';
import tasksControllers from '../controllers/task';
import tasksValidations from '../validations/task';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .post('/', tasksValidations.updateTaskValidation, tasksControllers.createTask)
  .delete('/:id', tasksControllers.deleteTask)
  .get('/:id', tasksControllers.getOneTask)
  .put('/:id', tasksValidations.updateTaskValidation, tasksControllers.updateTask);

export default router;
