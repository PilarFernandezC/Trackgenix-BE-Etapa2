import Joi from 'joi';
import mongoose from 'mongoose';
import Timesheet from '../models/TimeSheet';

const { ObjectId } = mongoose.Types;

const isValidId = (id) => {
  try {
    const oid = new ObjectId(id);
    return ObjectId.isValid(id)
        && oid.toString() === id;
  } catch {
    return false;
  }
};

const createTimesheet = async (req, res) => {
  try {
    const newTimesheet = new Timesheet({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
      employee: req.body.employee,
      project: req.body.project,
      hours: req.body.hours,
    });
    const result = await newTimesheet.save();
    if (result) {
      return res.status(201).json({
        message: 'Timesheet created successfully.',
        data: result,
        error: false,
      });
    } else {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Timesheet creation failed.',
        status: 500,
      };
    }
  }
    catch (error) {
    if (error instanceof Joi.ValidationError) error.status = 400;
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const getAllTimesheets = async (req, res) => {
  try {
    const { id } = req.params;
    const timesheetFound = req.query.disablePopulate
      ? await Timesheet.find(id)
      : await Timesheet.find(id)
        .populate('task')
        .populate('employee')
        .populate('project');
    if (!timesheetFound) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Timesheet not found',
        status: 404,
      };
    }
    if (timesheetFound.length !== 0) {
      return res.status(200).json({
        message: 'Timesheet found',
        data: timesheetFound,
        error: false,
      });
    }
    let filterByParams = [...timesheetFound];
    if (req.query.description) {
      filterByParams = timesheetFound.filter(
        (timesheet) => timesheet.description === req.query.description,
      );
    }
    if (req.query.date) {
      filterByParams = filterByParams.filter(
        (timesheet) => timesheet.date === req.query.date,
      );
    }
    if (req.query.task) {
      filterByParams = filterByParams.filter(
        (timesheet) => timesheet.task === req.query.task,
      );
    }
    if (req.query.employees) {
      filterByParams = filterByParams.filter(
        (timesheet) => timesheet.employee === req.query.employees,
      );
    }
    if (req.query.project) {
      filterByParams = filterByParams.filter(
        (timesheet) => timesheet.project === req.query.project,
      );
    }
    if (req.query.hours) {
      filterByParams = filterByParams.filter(
        (timesheet) => timesheet.hours === req.query.hours,
      );
    }
    return res.status(200).json({ filterByParams });
  } catch (error) {
    if (error instanceof Joi.ValidationError) error.status = 400;
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const getOneTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Invalid id',
        status: 400,
      };
    }
    const timeSheet = req.query.disablePopulate
      ? await Timesheet.findById(id)
      : await Timesheet.findById(id)
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
      message: `Timesheet id='${id}' found`,
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const updateTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Invalid or non-existent id',
        status: 400,
      };
    }
    const timeSheet = req.body;
    const response = await Timesheet.findByIdAndUpdate(id, {
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
      message: 'Timesheet updated successfully.',
      data: response,
      error: false,
    });
  } catch (error) {
    if (error instanceof Joi.ValidationError) error.status = 400;
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const deleteTimesheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Timesheet.findByIdAndDelete(id);
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
