import express from 'express';
import TimesheetController from '../controllers/timeSheet';
import timesheetValidation from '../validations/timeSheet';

const router = express.Router();

router.get('/', TimesheetController.getAllTimesheets);
router.get('/:id', TimesheetController.getOneTimesheet);
router.post('/:id?', timesheetValidation.validateCreate, TimesheetController.createTimesheet);
router.put('/:id?', timesheetValidation.validateUpdate, TimesheetController.updateTimesheet);
router.delete('/:id', TimesheetController.deleteTimesheet);

export default router;
