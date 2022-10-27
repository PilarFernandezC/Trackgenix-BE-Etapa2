import TimesheetModel from '../models/TimeSheet';

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new TimesheetModel({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
      employee: req.body.employee,
      project: req.body.project,
      hours: req.body.hours,
    });
    const result = await newTimesheet.save();
    return res.status(201).json({
      message: 'Timesheet created',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getAllTimesheets = async (req, res) => {
  const timesheetArray = Object.keys(req.query);
  try {
    const TimesheetFound = await TimesheetModel.find()
      .populate('task')
      .populate('employee')
      .populate('project');

    if (!TimesheetFound) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Timesheet not found',
        status: 404,
      };
    }
    if (timesheetArray.length === 0) {
      return res.status(200).json({
        message: 'Timesheet found',
        data: TimesheetFound,
      });
    }
    let filterByParams;
    if (req.query.description) {
      filterByParams = TimesheetFound.filter(
        (timesheet) => timesheet.description === req.query.description,
      );
    }
    if (req.query.date) {
      filterByParams = TimesheetFound.filter(
        (timesheet) => timesheet.date === req.query.date,
      );
    }
    if (req.query.task) {
      filterByParams = TimesheetFound.filter(
        (timesheet) => timesheet.task === req.query.task,
      );
    }
    if (req.query.employees) {
      filterByParams = TimesheetFound.filter(
        (timesheet) => timesheet.employee === req.query.employees,
      );
    }
    if (req.query.project) {
      filterByParams = TimesheetFound.filter(
        (timesheet) => timesheet.project === req.query.project,
      );
    }
    if (req.query.hours) {
      filterByParams = TimesheetFound.filter(
        (timesheet) => timesheet.hours === parseInt(req.query.hours, 10),
      );
    }
    return res.status(200).json({ filterByParams });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const getOneTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const timeSheet = await TimesheetModel.findById(id)
      .populate('task')
      .populate('employee')
      .populate('project');

    if (!timeSheet) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Timesheet not found',
        status: 404,
      };
    }
    return res.status(200).json({
      msg: 'The time-sheet has been found',
      data: timeSheet,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
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
      employee: timeSheet.employee,
      project: timeSheet.project,
      hours: timeSheet.hours,
    });
    if (!response) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Timesheet not found',
        status: 404,
      };
    }
    return res.status(200).json({
      msg: 'The time-sheet has been Updated',
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TimesheetModel.findByIdAndDelete(id);
    if (!result) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Timesheet not found',
        status: 404,
      };
    }
    return res.status(204).json({
      msg: 'The time-sheet has been deleted: ',
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
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
