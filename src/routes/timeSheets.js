import express from 'express';
import {
  deleteTimesheet, updateTimesheet, getOneTimesheet,
} from '../controllers/timeSheet';
import TimeSheetValidateUpdate from '../validations/timeSheet';

const router = express.Router();

router
  .delete('/:id', deleteTimesheet)
  .get('/:id', getOneTimesheet)
  .put('/:id', TimeSheetValidateUpdate, updateTimesheet);

export default router;
