import express from 'express';
import employeeControllers from '../controllers/employee';
import dataValidator from '../validations/employee';

const router = express.Router();

router.get('/:id', employeeControllers.getEmployeeById);
router.put('/:id', dataValidator, employeeControllers.editEmployee);
router.delete('/:id', employeeControllers.deleteEmployee);
export default router;
