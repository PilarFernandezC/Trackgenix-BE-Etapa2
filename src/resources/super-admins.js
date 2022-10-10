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
router.get('/filterBy', (req, res) => {
  const {
    nameIs,
    nameContains,
    lastNameIs,
    lastNameContains,
    emailIs,
    emailContains,

  } = req.query;
  if (
    (nameIs
    || nameContains
    || lastNameIs
    || lastNameContains
    || emailIs
    || emailContains) !== undefined
  ) {
    let filteredSAdmins = [...superadminList];
    if (nameIs) {
      filteredSAdmins = filteredSAdmins.filter((sa) => sa.name === nameIs);
    }
    if (nameContains) {
      filteredSAdmins = filteredSAdmins.filter((sa) => sa.name.includes(nameContains));
    }
    if (lastNameIs) {
      filteredSAdmins = filteredSAdmins.filter((sa) => sa.lastName === lastNameIs);
    }
    if (lastNameContains) {
      filteredSAdmins = filteredSAdmins.filter((sa) => sa.lastName.includes(lastNameContains));
    }
    if (emailIs) {
      filteredSAdmins = filteredSAdmins.filter((sa) => sa.email === emailIs);
    }
    if (emailContains) {
      filteredSAdmins = filteredSAdmins.filter((sa) => sa.email.includes(emailContains));
    }
    res.send(filteredSAdmins);
  } else {
    res.status = 400;
    res.send('Error: no filtering parameters specified.');
  }
});
module.exports = router;
