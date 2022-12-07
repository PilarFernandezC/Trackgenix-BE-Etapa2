import express from 'express';
import superAdminControllers from '../controllers/superAdmin';
import superAdminValidation from '../validations/superAdmin';

const router = express.Router();

router.get('/', superAdminControllers.getAllSuperAdmins);
router.get('/:id', superAdminControllers.getSuperAdminById);
router.post('/', superAdminValidation.createValidation, superAdminControllers.createSuperAdmin);
router.put('/:id', superAdminValidation.createValidation, superAdminControllers.editSuperAdmin);
router.delete('/:id', superAdminControllers.deleteSuperAdmin);

export default router;
