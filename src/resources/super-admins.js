const express = require('express');
// const fileSystem = require('fs');

const superadminList = require('../data/super-admins.json');

const router = express.Router();

router.get('/:id', (req, res) => {
  const superAdminId = req.params.id;
  // eslint-disable-next-line max-len
  const superAdminFound = superadminList.some((superAdmin) => superAdmin.id === parseInt(superAdminId, 10));
  if (superAdminFound) {
    res.json(superadminList.filter((superAdmin) => superAdmin.id === parseInt(superAdminId, 10)));
  } else {
    res.send(`Couldn't find a SuperAdmin with id ${superAdminId}`);
  }
});

module.exports = router;
