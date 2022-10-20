import express from 'express';
import tasksControllers from '../controllers/task';
import tasksValidations from '../validations/task';

const router = express.Router();

router
  .get('/', tasksControllers.getAllTasks)
  .post('/', tasksValidations.validateCreation, tasksControllers.createTask);

export default router;
