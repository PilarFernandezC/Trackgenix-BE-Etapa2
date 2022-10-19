import express from 'express';
import dataValidator from '../validations/projects';
import dbController from '../controllers/projects';

const router = express.Router();

router.get('/:id', dbController.getOne);
router.patch('/:id', express.json(), dataValidator.update, dbController.update);
router.delete('/:id', dbController.delete);

export default router;
