const express = require('express');
const fileSystem = require('fs');

const superadminList = require('../data/super-admins.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const superAdminFound = superadminList.some((superAdmin) => superAdmin.id
  === parseInt(superAdminId, 10));
  if (superAdminFound) {
    res.json(superadminList.filter((superAdmin) => superAdmin.id === parseInt(superAdminId, 10)));
  } else {
    res.send(`Couldn't find a SuperAdmin with id ${superAdminId}`);
  }
});

router.post('/create', (req, res) => {
  const newSuperAdmin = {
    id: parseInt(req.body.id, 10),
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  superadminList.push(newSuperAdmin);
  fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superadminList, null, 4), (error) => {
    if (error) {
      res.status(400).json({ msg: 'ERROR! Could not create a SuperAdmin' });
    }
    res.send(`SuperAdmin ${req.body.name} ${req.body.lastName} created`);
  });
});

module.exports = router;
