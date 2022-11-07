import SuperAdmin from '../models/SuperAdmin';

const getSAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdminData = await SuperAdmin.findById(id);
    if (!superAdminData) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'SuperAdmin not found', status: 404,
      };
    }
    return res.status(200).json({
      message: 'SuperAdmin found',
      data: superAdminData,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getAll = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const superAdmins = await SuperAdmin.find();
    if (!superAdmins) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'SuperAdmin not found', status: 404,
      };
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'SuperAdmins found',
        data: superAdmins,
      });
    }
    let filterByParams;
    if (req.query.name) {
      filterByParams = superAdmins.filter((superAdmin) => superAdmin.name === req.query.name);
    }
    if (req.query.lastName) {
      filterByParams = superAdmins.filter((superAdmin) => superAdmin.lastName
      === req.query.lastName);
    }
    if (req.query.email) {
      filterByParams = superAdmins.filter((superAdmin) => superAdmin.email === req.query.email);
    }
    return res.status(200).json({
      message: 'Super admin found succesfully',
      data: filterByParams,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const updateSAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmin.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'SuperAdmin not found', status: 404,
      };
    }
    return res.status(200).json({
      message: 'SuperAdmin edited.',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const deleteSAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmin.findByIdAndDelete(id);
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'SuperAdmin not found', status: 404,
      };
    }
    return res.status(204).json({
      message: 'Super Admin deleted.',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const create = async (req, res) => {
  try {
    const newSupAdmin = new SuperAdmin({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const confirm = await newSupAdmin.save();
    if (!newSupAdmin) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Could not create SuperAdmin', status: 404,
      };
    }
    return res.status(201).json({
      message: 'Super Admins created',
      data: confirm,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

export default {
  getSAdminById,
  updateSAdmin,
  deleteSAdmin,
  getAll,
  create,
};
