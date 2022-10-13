const fs = require('fs');
const express = require('express');
const project = require('../data/projects.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).json({
    data: project,
  });
});
router.get('/getById/:id', (req, res) => {
  const found = project.find((proj) => proj.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(project.filter((proj) => proj.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: 'project not found' });
  }
});
router.post('/createNew', (req, res) => {
  const requesBody = req.body;
  project.push(requesBody);
  fs.writeFile('src/data/projects.json', JSON.stringify(requesBody, null, 2), (err) => {
    if (err) {
      res.send('error');
    }
  });
  res.send('New Project Created');
});
module.exports = router;
