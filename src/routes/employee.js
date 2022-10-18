import express from 'express';
import employeeControllers from '../controllers/employee';

const router = express.Router();

router
  .get('/:id', employeeControllers.getEmployeeById);

export default router;
