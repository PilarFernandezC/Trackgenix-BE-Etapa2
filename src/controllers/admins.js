import Admins from '../models/Admin';

const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await admin.save();
    if (!result) {
    // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Could not create a new admin.', status: 400,
      };
    }
    return res.status(201).json({
      message: 'New admin successfully created.',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admins.findById(id);
    if (!admins) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: 'Admin found.',
      data: admins,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true },
    );
    if (!result) {
    // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    return res.status(200).json({
      message: `Admin with the ID ${req.params.id} has been updated.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getAllAdmins = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const admins = await Admins.find(req.query);
    if (!admins) {
    // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'Admins found.',
        data: admins,
      });
    }
    let filterByParams;
    if (req.query.name) {
      filterByParams = admins.filter((admin) => admin.name === req.query.name);
    }
    if (req.query.lastName) {
      filterByParams = admins.filter((admin) => admin.lastName === req.query.lastName);
    }
    if (req.query.email) {
      filterByParams = admins.filter((admin) => admin.email === req.query.email);
    }
    return res.status(200).json({
      message: 'Admin found succesfully',
      data: filterByParams,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admins.findByIdAndDelete(id);
    if (!result) {
    // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Admin not found.', status: 404,
      };
    }
    return res.status(204).json({
      message: `Admin with the ID ${req.params.id} has been deleted.`,
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

export default {
  createAdmin,
  getAllAdmins,
  getAdminById,
  editAdmin,
  deleteAdmin,
};
