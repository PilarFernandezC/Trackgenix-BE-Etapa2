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
      message: 'An error ocurred',
      error,
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.find();
    return res.status(200).json({
      message: 'Admin found',
      data: admins,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};

export default {
  createAdmin,
  getAllAdmins,
};
