import express from 'express';
import timesheetRouter from './timeSheets';
import admin from './admins';

const router = express.Router();

router.use('/timesheets', timesheetRouter);
router.use('/admins', admin);

export default router;
