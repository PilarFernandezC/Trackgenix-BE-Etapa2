import express from 'express';
import projectsRouter from './projects';
import admin from './admins';

const router = express.Router();
router.use('/projects', projectsRouter);
router.use('/admins', admin);

export default router;
