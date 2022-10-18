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

const getAllAdmins = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const admins = await Admins.find();
    if (!admins) {
      return req.status(404).json({
        message: 'Admin not found',
      });
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
    return res.status(400).json({
      message: `An error ocurred ${error}`,
    });
  }
};

export default {
  createAdmin,
  getAllAdmins,
};
