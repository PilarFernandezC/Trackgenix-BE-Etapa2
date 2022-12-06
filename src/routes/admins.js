import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';
import checkAuth from '../middlewares/authMiddleware';

import { SUPER_ADMIN } from '../constants/roles';

const router = express.Router();

router.get('/', checkAuth([SUPER_ADMIN]), adminControllers.getAllAdmins);
router.get('/:id', checkAuth([SUPER_ADMIN]), adminControllers.getAdminById);
router.post('/', checkAuth([SUPER_ADMIN]), adminValidations.validateCreation, adminControllers.createAdmin);
router.put('/:id', checkAuth([SUPER_ADMIN]), adminValidations.validateCreation, adminControllers.editAdmin);
router.delete('/:id', checkAuth([SUPER_ADMIN]), adminControllers.deleteAdmin);

export default router;
