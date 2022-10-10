const express = require('express');
// const fs = require('fs');
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

// final footer
module.exports = router;
