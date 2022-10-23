import express from 'express';
import TimesheetController from '../controllers/timeSheet';
import timesheetValidation from '../validations/timeSheet';

const router = express.Router();

router.post('/', timesheetValidation.validateCreate, TimesheetController.createTimesheet);
router.get('/', TimesheetController.getAllTimesheets);
router.delete('/:id', TimesheetController.deleteTimesheet);
router.get('/:id', TimesheetController.getOneTimesheet);
router.put('/:id', timesheetValidation.validateUpdate, TimesheetController.updateTimesheet);

export default router;
