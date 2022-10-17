import express from 'express';
import superAdminControllers from '../controllers/SuperAdmin';
import superAdminValidation from '../validations/superAdmin';

const router = express.Router();

router.get('/', superAdminControllers.getAll);
router.post('/', superAdminValidation.createValidation, superAdminControllers.create);

export default router;
