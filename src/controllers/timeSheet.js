import Models from '../models/TimeSheet';

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new Models({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
    });
    const result = await newTimesheet.save();
    return res.status(201).json({
      message: 'Timesheet created',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
    });
  }
};

export default {
  createTimesheet,
};
