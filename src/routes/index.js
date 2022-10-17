import express from 'express';
import timeSheetRouter from './timeSheets';

const router = express.Router();

router.use('/timeSheets', timeSheetRouter);

export default router;
