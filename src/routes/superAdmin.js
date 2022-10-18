import express from 'express';
import { getSAdminById, updateSAdmin, deleteSAdmin } from '../controllers/superAdmin';
import superAdminValidation from '../validations/superAdmin';

const router = express.Router();

router
  .get('/:id', getSAdminById)
  .put('/:id', superAdminValidation, updateSAdmin)
  .delete('/:id', deleteSAdmin);

export default router;
