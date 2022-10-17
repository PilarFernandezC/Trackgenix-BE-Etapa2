import express from 'express';
import {
  deleteTS, updateTS, getOneTS,
} from '../controllers/timeSheet';

const router = express.Router();

router
  .delete('/:id', deleteTS)
  .get('/:id', getOneTS)
  .put('/:id', updateTS);

export default router;
