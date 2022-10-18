import Project from '../models/Projects';

const dummyDBgetOne = async (req, res) => {
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

function dummyDBupdate(req, res) {
  res.send('dummyDBupdate');
}

function dummyDBdelete(req, res) {
  res.send('dummyDBdelete');
}

export default {
  getOne: dummyDBgetOne,
  update: dummyDBupdate,
  delete: dummyDBdelete,
};
