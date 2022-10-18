import express from 'express';
import TimesheetController from '../controllers/timeSheet';
import validaTimesheet from '../validations/timeSheet';

const router = express.Router();

router
  .post('/', validaTimesheet, TimesheetController.createTimesheet);

export default router;
