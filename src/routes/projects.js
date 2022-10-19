import express from 'express';
import dbController from '../controllers/projects';

const router = express.Router();

router.get('/:id', dbController.getOne);
router.patch('/:id', dbController.update);
router.delete('/:id', dbController.delete);

export default router;
