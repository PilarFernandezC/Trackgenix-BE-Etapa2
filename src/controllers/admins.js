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
    return res.status(201).json({
      message: 'Admin created successfully',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error ocurred ${error}`,
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
        message: 'Admin not found', status: 404,
      };
    }
    return res.status(200).json({
      message: 'Admin Found',
      data: admins,
    });
  } catch (error) {
    return res.status(400).json({
      message: `Admin does not exists: ${error}`,
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
      return res.status(404).json({
        message: 'Admin does not exists',
      });
    }
    return res.status(200).json({
      message: `Admin with ID ${id} edited.`,
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
        message: 'Admin not found', status: 404,
      };
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'Admin found',
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
    return res.status(200).json({ filterByParams });
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
      return res.status(404).json({
        message: 'Admin does not exists',
      });
    }
    return res.status(200).json({
      message: `Admin with ID ${id} deleted.`,
      data: result,
    });
  } catch (error) {
    return res.json({
      message: `Admin does not exists: ${error}`,
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
