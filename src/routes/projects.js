import express from 'express';
import dataValidator from '../validations/projects';
import dbController from '../controllers/projects';

const router = express.Router();

router.get('/', dbController.getAll);
router.get('/:id', dbController.getById);
router.post('/', dataValidator, dbController.create);
router.put('/:id', dataValidator, dbController.updateById);
router.delete('/:id', dbController.deleteById);

export default router;
