import express from 'express';
import dataValidator from '../validations/projects';
import dbController from '../controllers/projects';

const router = express.Router();

router.get('/', dbController.getOne);
router.patch('/', dataValidator.update, dbController.update);
router.delete('/', dbController.delete);

export default router;
