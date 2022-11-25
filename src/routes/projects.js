import express from 'express';
import dataValidator from '../validations/projects';
import dbController from '../controllers/projects';
import checkAuth from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', checkAuth(['ADMIN, EMPLOYEE']), dbController.getAll);
router.get('/:id', checkAuth(['ADMIN, EMPLOYEE']), dbController.getById);
router.post('/', checkAuth(['ADMIN']), dataValidator, dbController.create);
router.put('/:id', checkAuth(['ADMIN']), dataValidator, dbController.updateById);
router.delete('/:id', checkAuth(['ADMIN']), dbController.deleteById);

export default router;
