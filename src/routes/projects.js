import express from 'express';
import dataValidator from '../validations/projects';
import dbController from '../controllers/projects';

const router = express.Router();

router.get('/', dbController.getAll);
router.post('/', dataValidator.createValidation, dbController.create);

export default router;
