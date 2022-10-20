import express from 'express';
import timesheetRouter from './timeSheets';
import adminRouter from './admins';
import projectsRouter from './projects';
import superAdminRouter from './superAdmin';
import employeesRouter from './employee';

const router = express.Router();

router.use('/projects', projectsRouter);
router.use('/superAdmin', superAdminRouter);
router.use('/employees', employeesRouter);
router.use('/admin', adminRouter);
router.use('/timesheets', timesheetRouter);

export default router;
