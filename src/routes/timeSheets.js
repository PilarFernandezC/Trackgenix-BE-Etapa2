import express from 'express';
import {
  deleteTimesheet, updateTimesheet, getOneTimesheet,
} from '../controllers/timeSheet';
import validateTimesheet from '../validations/timeSheet';

const router = express.Router();

router
  .delete('/:id', deleteTimesheet)
  .get('/:id', getOneTimesheet)
  .put('/:id', validateTimesheet, updateTimesheet);

export default router;
