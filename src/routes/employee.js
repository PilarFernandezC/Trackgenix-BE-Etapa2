import express from 'express';
import dataValidator from '../validations/employee';
import dbController from '../controllers/employee';

const router = express.Router();

router.post('/', dataValidator, dbController.create);
router.get('/', dbController.filter);

export default router;
