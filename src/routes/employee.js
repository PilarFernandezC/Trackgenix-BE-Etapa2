import express from 'express';
import dataValidator from '../validations/employee';
import dbController from '../controllers/employee';

const router = express.Router();

router.get('/', dbController.filterEmployees);
router.get('/:id', dbController.getEmployeeById);
router.post('/', dataValidator, dbController.createEmployee);
router.put('/:id', dataValidator, dbController.editEmployee);
router.delete('/:id', dbController.deleteEmployee);

export default router;
