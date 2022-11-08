import Project from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

const getAll = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const projects = await Project.find().populate({
      path: 'employees',
      populate: {
        path: 'employeeId',
      },
    });
    if (!projects) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Projects not found', status: 404,
      };
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'Projects found',
        data: projects,
      });
    }
    let filterByParams;
    if (req.query.name) {
      filterByParams = projects.filter((project) => project.name === req.query.name);
    }
    return res.status(200).json({
      message: 'Project found succesfully',
      data: filterByParams,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const create = async (req, res) => {
  try {
    const newProject = new Project({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      employees: req.body.employees,
    });
    const confirm = await newProject.save();
    if (!newProject) {
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Could not create the project', status: 400,
      };
    }
    return res.status(201).json({
      message: 'New Project created',
      data: confirm,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
    });
  }
};

const isValidId = (id) => {
  try {
    const oid = new ObjectId(id);
    return ObjectId.isValid(id)
      && oid.toString() === id;
  } catch {
    return false;
  }
};

const getById = async (req, res) => {
  if (req.params.id && isValidId(req.params.id)) {
    try {
      const retrievedProject = await Project.findById(req.params.id).populate('employees');
      if (retrievedProject !== null) {
        res.status(200).json({
          message: `Project with id=${req.params.id} found.`,
          data: retrievedProject,
        });
      } else {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'Project not found', status: 404,
        };
      }
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || error,
      });
    }
  }
};

const updateById = async (req, res) => {
  if (req.params.id && isValidId(req.params.id)) {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (updatedProject !== null) {
        res.status(200).json({
          message: `Project with id=${req.params.id} has been updated.`,
          data: updatedProject,
        });
      } else {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'Project not found', status: 404,
        };
      }
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || error,
      });
    }
  } else {
    res.status(400).json({ message: 'No projects with this ID were found' });
  }
};

const deleteById = async (req, res) => {
  if (req.params.id && isValidId(req.params.id)) {
    try {
      const response = await Project.findByIdAndDelete(req.params.id);
      if (response !== null) {
        res.status(204).json({
          message: `Project with id=${req.params.id} deleted.`,
        });
      } else {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'Project not found', status: 404,
        };
      }
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message, error,
      });
    }
  }
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
