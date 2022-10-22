import express from 'express';
import tasksControllers from '../controllers/task';
import tasksValidations from '../validations/task';

const router = express.Router();

router.get('/', tasksControllers.getAllTasks);
router.post('/', tasksValidations.updateTaskValidation, tasksControllers.createTask);
router.delete('/:id', tasksControllers.deleteTask);
router.get('/:id', tasksControllers.getOneTask);
router.put('/:id', tasksValidations.updateTaskValidation, tasksControllers.updateTask);

export default router;
