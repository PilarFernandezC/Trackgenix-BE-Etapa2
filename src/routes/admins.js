import express from 'express';
import adminControllers from '../controllers/admins';
import adminValidations from '../validations/admins';

const router = express.Router();

router
  .get('/:id', adminControllers.getAdminById)
  .put('/:id', adminValidations.validateCreation, adminControllers.editAdmin)
  .delete('/:id', adminControllers.deleteAdmin);

export default router;
