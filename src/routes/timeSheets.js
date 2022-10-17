import express from 'express';
import {
  deleteTS, updateTS, getOneTS,
} from '../controllers/timeSheet';
import updateTSValidation from '../validations/timesheet'

const router = express.Router();

router
  .delete('/:id', deleteTS)
  .get('/:id', getOneTS)
  .put('/:id', updateTSValidation, updateTS);

export default router;
