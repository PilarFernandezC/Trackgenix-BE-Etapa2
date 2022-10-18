import express from 'express';
import superAdminControllers from '../controllers/superAdmin';
import superAdminValidation from '../validations/superAdmin';

const router = express.Router();

router.get('/', superAdminControllers.getAll);
// router.get('/params',superAdminControllers.filtSuperAdmin);
router.post('/', superAdminValidation.createValidation, superAdminControllers.create);

export default router;
