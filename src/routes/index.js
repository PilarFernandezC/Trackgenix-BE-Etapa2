import express from 'express';
import superAdminRouter from './superAdmin';
import admin from './admins';

const router = express.Router();
router.use('/superAdmin', superAdminRouter);
router.use('/admins', admin);

export default router;
