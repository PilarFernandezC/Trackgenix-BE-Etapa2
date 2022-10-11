const express = require('express');
const fs = require('fs');
// const app = express;
const router = express.Router();
const admins = require('../data/admins.json');

// get all admins - Bessone
router.get('/getAllAdmins', (req, res) => res.json(admins));

// get admin by id - Bessone
router.get('/:id', (req, res) => {
  const adminFound = admins.some((admin) => admin.id === parseInt(req.params.id, 10));
  if (adminFound) {
    res.json(admins.filter((admin) => admin.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: 'ERROR! No Admin found' });
  }
});

// create new admin
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
      res.status(400).json({ msg: 'ERROR!' });
    }
    res.send(`Admin ${req.body.email} created`);
  });
});

// final footer
module.exports = router;
