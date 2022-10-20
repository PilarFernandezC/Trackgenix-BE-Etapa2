import Project from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

const getAll = async (req, res) => {
  const queriesArray = Object.keys(req.query);
  try {
    const projects = await Project.find();
    if (!projects) {
      return res.status(404).json({
        message: 'An error occured ',
      });
    }
    if (queriesArray.length === 0) {
      return res.status(200).json({
        message: 'Projects founded',
        data: projects,
      });
    }
    let filterByParams;
    if (req.query.name) {
      filterByParams = projects.filter((project) => project.name === req.query.name);
    }
    return res.status(200).json({ filterByParams });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
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
      return res.status(400).json({
        message: 'All the fileds need to be filled',
        data: confirm,
      });
    }
    return res.status(201).json({
      message: 'New Project created',
      data: confirm,
    });
  } catch (error) {
    return res.json({
      message: `An error ocurred: ${error}`,
      error,
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
      const retrievedProject = await Project.findById(req.params.id);
      if (retrievedProject !== null) {
        res.status(200).json({
          message: `Project with id=${req.params.id} found.`,
          data: retrievedProject,
        });
      } else {
        res.status(404).json({
          message: `Project with id=${req.params.id} not found.`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: 'Error: id is invalid or missing.',
    });
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
        res.status(404).json({
          message: `Project with id=${req.params.id} not found.`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: 'Error: id is invalid or missing.',
    });
  }
};

const deleteById = async (req, res) => {
  if (req.params.id && isValidId(req.params.id)) {
    try {
      const response = await Project.findByIdAndDelete(req.params.id);
      if (response !== null) {
        res.status(202).json({
          message: `Project with id=${req.params.id} deleted.`,
        });
      } else {
        res.status(404).json({
          message: `Project with id=${req.params.id} not found.`,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: 'Error: id is invalid or missing.',
    });
  }
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
