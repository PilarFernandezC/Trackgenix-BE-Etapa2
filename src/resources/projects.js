const project = require('../data/projects.json');

const callPj = (req, res) => {
  res.status(200).json({
    data: project,
  });
};

export default callPj;
