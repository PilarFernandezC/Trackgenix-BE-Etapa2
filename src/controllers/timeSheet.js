import Models from '../models/TimeSheet';

export const getOneTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSheet = await Models.findById(id);
    if (!timeSheet) {
      return res.status(404).json({
        msg: 'The time-sheet has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The time-sheet has been found',
      data: timeSheet,
    });
  } catch (error) {
    return res.json({
      message: `an error ocurred: ${error}`,
    });
  }
};

export const updateTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSheet = req.body;
    const response = await Models.findByIdAndUpdate(id, {
      description: timeSheet.description,
      date: timeSheet.date,
      task: timeSheet.task,
    });
    if (!response) {
      return res.status(404).json({
        msg: 'The time-sheet has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The time-sheet has been Updated',
    });
  } catch (error) {
    return res.json({
      message: `an error ocurred: ${error}`,
    });
  }
};

export const deleteTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Models.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        msg: 'The time-sheet has not been found',
      });
    }
    return res.status(204).json({
      msg: 'The time-sheet has been deleted: ',
      data: result,
    });
  } catch (error) {
    return res.json({
      message: `an error ocurred: ${error}`,
    });
  }
};
