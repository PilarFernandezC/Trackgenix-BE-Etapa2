import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router.post('/', adminValidations.validateCreation, adminControllers.createAdmin);
router.get('/', adminControllers.getAllAdmins);
router.get('/:id', adminControllers.getAdminById);
router.put('/:id', adminValidations.validateCreation, adminControllers.editAdmin);
router.delete('/:id', adminControllers.deleteAdmin);

export default router;
