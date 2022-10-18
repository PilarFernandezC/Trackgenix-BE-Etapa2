import superAdmin from '../models/SuperAdmin';

export const getSAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmins = await superAdmin.findById(id);
    if (!superAdmins) {
      return res.status(404).json({
        message: '404 Not found',
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Request successful!',
      data: superAdmins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error!',
      error,
    });
  }
};

export const updateSAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await superAdmin.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: '404 Not found',
        error: false,
      });
    }
    return res.status(200).json({
      message: `Super Admin (ID ${id}) edited.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error!',
      error,
    });
  }
};

export const deleteSAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await superAdmin.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: '404 Not found',
        error: false,
      });
    }
    return res.status(200).json({
      message: `Super Admin (ID ${id}) deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Error!',
      error,
    });
  }
};
