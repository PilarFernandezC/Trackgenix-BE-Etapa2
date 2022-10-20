import express from 'express';
import TimesheetController from '../controllers/timeSheet';
import validateTimesheet from '../validations/timeSheet';

const router = express.Router();

router.post('/', validateTimesheet, TimesheetController.createTimesheet);
router.get('/', TimesheetController.getAllTimesheets);
router.delete('/:id', TimesheetController.deleteTimesheet)
router.get('/:id', TimesheetController.getOneTimesheet)
router.put('/:id', validateTimesheet, TimesheetController.updateTimesheet);

export default router;



