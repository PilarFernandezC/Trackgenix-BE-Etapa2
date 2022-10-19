import Project from '../models/Projects';

const { ObjectId } = require('mongoose').Types;

const isValidId = (id) => {
  try {
    const oid = new ObjectId(id);
    return ObjectId.isValid(id)
    && oid.toString() === id;
  } catch {
    return false;
  }
};
const getProjectById = async (req, res) => {
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

const updateProjectById = async (req, res) => {
  if (req.params.id && isValidId(req.params.id)) {
    try {
      const updateResponse = await Project.findByIdAndUpdate(req.params.id, req.body);
      if (updateResponse !== null) {
        const updatedProject = await Project.findById(req.params.id);
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

const deleteProjectById = async (req, res) => {
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
  getOne: getProjectById,
  update: updateProjectById,
  delete: deleteProjectById,
};
