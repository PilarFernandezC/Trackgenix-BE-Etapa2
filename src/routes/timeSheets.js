import express from 'express';
import TimesheetController from '../controllers/timeSheet';
import timesheetValidation from '../validations/timeSheet';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['ADMIN, EMPLOYEE']), TimesheetController.getAllTimesheets);
router.get('/:id', checkAuth(['ADMIN, EMPLOYEE']), TimesheetController.getOneTimesheet);
router.post('/:id?', checkAuth(['ADMIN, EMPLOYEE']), timesheetValidation.validateCreate, TimesheetController.createTimesheet);
router.put('/:id?', checkAuth(['ADMIN, EMPLOYEE']), timesheetValidation.validateUpdate, TimesheetController.updateTimesheet);
router.delete('/:id', checkAuth(['ADMIN, EMPLOYEE']), TimesheetController.deleteTimesheet);

export default router;
