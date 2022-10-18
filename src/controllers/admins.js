import Admin from '../models/Admin';

const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admins = await Admin.findById(id);
    if (!admins) {
      return res.status(404).json({
        message: 'Admin does not exists',
      });
    }
    return res.status(200).json({
      message: 'Admin Found',
      data: admins,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Admin does not exists',
      $: { error },
    });
  }
};

const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admin.findByIdAndUpdate(
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
    return res.status(400).json({
      message: 'Admin does not exists',
      $: { error },
    });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admin.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Admin does not exists',
        error: false,
      });
    }
    return res.status(200).json({
      message: `Admin with ID ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'Admin does not exists',
      $: { error },
    });
  }
};
export default {
  getAdminById,
  editAdmin,
  deleteAdmin,
};
