import TimesheetModel from '../models/TimeSheet';

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new TimesheetModel({
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

const getAllTimesheets = async (req, res) => {
  const timesheetArray = Object.keys(req.query);
  try {
    const TimesheetFound = await TimesheetModel.find();
    if (!TimesheetFound) {
      return res.status(404).json({
        message: 'An error has occured',
      });
    }
    if (timesheetArray.length === 0) {
      return res.status(200).json({
        message: 'Timesheet found',
        data: TimesheetFound,
      });
    }
    let filterByParams;
    if (req.query.description) {
      filterByParams = TimesheetFound.filter((timesheet) => timesheet.description
    === req.query.description);
    }
    if (req.query.date) {
      filterByParams = TimesheetFound.filter((timesheet) => timesheet.date
    === req.query.date);
    }
    if (req.query.task) {
      filterByParams = TimesheetFound.filter((timesheet) => timesheet.task === req.query.task);
    }
    return res.status(200).json({ filterByParams });
  } catch (error) {
    return res.json({
      message: `An error has ocurred: ${error}`,
    });
  }
};

const getOneTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSheet = await TimesheetModel.findById(id);
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

const updateTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSheet = req.body;
    const response = await TimesheetModel.findByIdAndUpdate(id, {
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

const deleteTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TimesheetModel.findByIdAndDelete(id);
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

export default {
  createTimesheet,
  getAllTimesheets,
  getOneTimesheet,
  updateTimesheet,
  deleteTimesheet,
};
