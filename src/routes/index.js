import express from 'express';
import taskRouter from './task';
import admin from './admins';

const router = express.Router();

router.use('/task', taskRouter);
router.use('/admins', admin);

export default router;
