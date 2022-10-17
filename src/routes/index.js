import express from 'express';
import adminRouter from './admins';

const router = express.Router();

router.use('/admin', adminRouter);

export default router;
