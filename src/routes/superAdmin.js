import express from 'express';
import superAdminControllers from '../controllers/superAdmin';
import superAdminValidation from '../validations/superAdmin';

const router = express.Router();

router.get('/:id', superAdminControllers.getSAdminById)
router.put('/:id', superAdminValidation.createValidation, superAdminControllers.updateSAdmin)
router.delete('/:id', superAdminControllers.deleteSAdmin);
router.get('/', superAdminControllers.getAll);
router.post('/', superAdminValidation.createValidation, superAdminControllers.create);

export default router;
