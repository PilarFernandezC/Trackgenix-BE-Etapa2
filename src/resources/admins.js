const express = require('express');
const fs = require('fs');
// const app = express;
const router = express.Router();
const admins = require('../data/admins.json');

router.get('/getAllAdmins', (req, res) => res.json(admins));

router.get('/:id', (req, res) => {
  const adminFound = admins.some((admin) => admin.id === parseInt(req.params.id, 10));
  if (adminFound) {
    res.json(admins.filter((admin) => admin.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: 'ERROR! No Admin found' });
  }
});

router.post('/createAdmin', (req, res) => {
  const newAdmin = {
    id: Number(req.body.id),
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  admins.push(newAdmin);
  fs.writeFile('src/data/admins.json', JSON.stringify(admins, null, 4), (error) => {
    if (error) {
      res.status(400).json({ msg: 'ERROR! Could not create an Admin' });
    }
    res.send(`Admin ${req.body.email} created`);
  });
});

router.delete('/deleteAdmin/:id', (req, res) => {
  const adminDeleter = admins.filter((admin) => admin.id !== parseInt(req.params.id, 10));
  fs.writeFile('src/data/admins.json', JSON.stringify(adminDeleter), (error) => {
    if (error) {
      res.send(`Can't delete Admin with ID: ${req.params.id}`);
    } else {
      res.send('Admin deleted');
      res.send(JSON.stringify(admins, null, 4));
    }
  });
});

module.exports = router;
