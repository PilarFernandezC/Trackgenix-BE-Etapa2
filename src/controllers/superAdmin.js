import firebaseApp from '../helpers/firebase/index';
import SuperAdmin from '../models/SuperAdmin';

const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.find(req.query);

    if (!superAdmin.length) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Super Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: 'SuperAdmins found.',
      data: superAdmin,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getSuperAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmin.findById(id);
    if (!superAdmin) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Super Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      msg: 'Super Admin found.',
      data: superAdmin,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  try {
    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebaseApp.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER_ADMIN' });

    const newSupAdmin = new SuperAdmin({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      firebaseUid: newFirebaseUser.uid,

    });
    const result = await newSupAdmin.save();
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Could not create a new Super Admin.', status: 400,
      };
    }
    return res.status(201).json({
      message: 'New Super Admin successfully created.',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const editSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmin.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    await firebaseApp.auth().updateUser(result.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Super Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: `Super Admin with the ID ${req.params.id} has been updated.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const deleteSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findById(req.params.id);
    await firebaseApp.auth().deleteUser(superAdmin.firebaseUid);
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Super Admin not found.', status: 404,
      };
    }
    return res.status(204).json({
      message: `Super Admin with the ID ${req.params.id} has been deleted.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

export default {
  getAllSuperAdmins,
  getSuperAdminById,
  createSuperAdmin,
  editSuperAdmin,
  deleteSuperAdmin,
};
