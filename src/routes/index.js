import express from 'express';
import timesheetRouter from './timeSheets';
import employeesRouter from './employee';
import admin from './admins';

const router = express.Router();

router.use('/timesheets', timesheetRouter);
router.use('/employees', employeesRouter);
router.use('/admins', admin);

export default router;
