import express from 'express';
import projectsRouter from './projects';
import superAdminRouter from './superAdmin';
import admin from './admins';
import employeesRouter from './employee';

const router = express.Router();

router.use('/projects', projectsRouter);
router.use('/superAdmin', superAdminRouter);
router.use('/employees', employeesRouter);
router.use('/admins', admin);

export default router;
