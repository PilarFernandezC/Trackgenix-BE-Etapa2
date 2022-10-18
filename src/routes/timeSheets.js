import express from 'express';
import {
  deleteTimesheet, updateTimesheet, getOneTimesheet,
} from '../controllers/timeSheet';
import updateTimesheetValidation from '../validations/timeSheet';

const router = express.Router();

router
  .delete('/:id', deleteTimesheet)
  .get('/:id', getOneTimesheet)
  .put('/:id', updateTimesheetValidation, updateTimesheet);

export default router;
