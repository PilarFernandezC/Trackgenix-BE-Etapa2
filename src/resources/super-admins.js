const express = require('express');
const fileSystem = require('fs');

const superadminList = require('../data/super-admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.send(superadminList);
});

router.put('/editById', (req, res) => {
  const {
    id: requestId,
    name: newName,
    lastName: newLastName,
    email: newEmail,
    password: newPassword,
  } = req.body;
  const indexOfSAdmin = superadminList.findIndex((sAdmin) => sAdmin.id === parseInt(requestId, 10));
  if (indexOfSAdmin !== -1) {
    const {
      id,
      name: oldName,
      lastName: oldLastName,
      email: oldEmail,
      pasword: oldPassword,
    } = superadminList[indexOfSAdmin];
    const updatedSAdmin = {
      id,
      name: newName || oldName,
      lastName: newLastName || oldLastName,
      email: newEmail || oldEmail,
      password: newPassword || oldPassword,
    };
    superadminList[indexOfSAdmin] = updatedSAdmin;
    fileSystem.writeFile('src/data/super-admins.json', JSON.stringify(superadminList, null, 4), (err) => {
      if (err) {
        res.send(["Error: can't write to filesystem.", err.toString()].join('\n'));
      } else {
        res.send(`Super admin id=${requestId} successfully updated.`);
      }
    });
  } else {
    res.status(400);
    res.send(`Error: Super admin id=${requestId} was not found.`);
  }
});
module.exports = router;
