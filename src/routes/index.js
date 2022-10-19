import express from 'express';
import employeesRouter from './employee';
import admin from './admins';

const router = express.Router();

router.use('/employees', employeesRouter);
router.use('/admins', admin);

export default router;
