import express from 'express';
import employeeControllers from '../controllers/employee';
import employeeValidations from '../validations/employee';

const router = express.Router();

router
  .get('/:id', employeeControllers.getEmployeeById)
  .put('/:id', employeeValidations.createValidation, employeeControllers.editEmployee);
export default router;
