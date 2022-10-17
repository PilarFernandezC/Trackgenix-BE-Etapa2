import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router.post('/', adminValidations.validateCreation, adminControllers.createAdmin);
router.get('/', adminControllers.getAllAdmins);

export default router;
