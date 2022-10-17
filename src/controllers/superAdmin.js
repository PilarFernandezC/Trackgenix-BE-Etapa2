import SuperAdmin from '../models/SuperAdmin';

const getAll = async (req, res) => {
  try {
    const superAdmins = await SuperAdmin.find();
    if (!superAdmins) {
      return res.status(404).json({
        message: 'An error occured ',
      });
    }
    return res.status(200).json({
      message: 'Super Admins founded',
      data: superAdmins,
    });
  } catch (error) {
    return res.json({
      message: 'An error occured ',
      error,
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
      return res.status(400).json({
        message: 'All the fileds need to be filled',
        data: confirm,

      });
    }
    return res.status(201).json({
      message: 'Super Admins created',
      data: confirm,
    });
  } catch (error) {
    return res.json({
      message: 'An error occured ',
      error,
    });
  }
};
export default {
  getAll,
  create,
};
