import express from 'express';
import employeesRouter from './employee';

const router = express.Router();

router.use('/employees', employeesRouter);

export default router;
