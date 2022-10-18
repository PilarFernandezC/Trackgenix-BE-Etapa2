import express from 'express';
import timesheetRouter from './timeSheets';

const router = express.Router();

router.use('/timesheets', timesheetRouter);

export default router;
