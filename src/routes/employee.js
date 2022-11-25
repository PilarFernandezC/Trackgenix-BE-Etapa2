import express from 'express';
import dataValidator from '../validations/employee';
import dbController from '../controllers/employee';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['ADMIN, SUPER_ADMIN']), dbController.filterEmployees);
router.get('/:id', checkAuth(['ADMIN, SUPER_ADMIN']), dbController.getEmployeeById);
router.post('/', dataValidator, dbController.createEmployee);
router.put('/:id', checkAuth(['ADMIN, SUPER_ADMIN, EMPLOYEE']), dataValidator, dbController.editEmployee);
router.delete('/:id', checkAuth(['ADMIN, SUPER_ADMIN, EMPLOYEE']), dbController.deleteEmployee);

export default router;
