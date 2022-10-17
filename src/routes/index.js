import express from 'express';
import superAdminRouter from './superAdmin';

const router = express.Router();

router.use('/superAdmin',superAdminRouter);

export default router;