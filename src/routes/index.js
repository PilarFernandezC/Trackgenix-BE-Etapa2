import express from 'express';
import admin from './admins';

const router = express.Router();

router.use('/admins', admin);

export default router;
