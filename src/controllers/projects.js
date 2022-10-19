import Project from '../models/Projects';

const getProjectById = async (req, res) => {
  if (req.params.id) {
    try {
      const retrievedProject = await Project.findById(req.params.id);
      res.status(200).json({
        message: `Project with id=${req.params.id} found.`,
        data: retrievedProject,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: 'Error: no project id provided',
    });
  }
};

const dummyDBupdate = async (req, res) => {
  res.send('dummyDBupdate');
};

const deleteProjectById = async (req, res) => {
  if (req.params.id) {
    try {
      await Project.findByIdAndDelete(req.params.id);
      res.status(202).json({
        message: `Project with id=${req.params.id} deleted.`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else {
    res.status(400).json({
      message: 'Error: no project id provided',
    });
  }
};

export default {
  getOne: getProjectById,
  update: dummyDBupdate,
  delete: deleteProjectById,
};
