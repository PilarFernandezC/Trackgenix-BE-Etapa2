const express = require('express');
const fs = require('fs');

const adminList = require('../data/admins.json');

const router = express.Router();

router.get('/getAll', (req, res) => {
  res.status(200).send(adminList);
});

router.put('/editById', (req, res) => {
  const {
    id: requestId,
    name: newName,
    lastName: newLastName,
    email: newEmail,
    password: newPassword,
  } = req.body;

  const indexOfAdmin = adminList.findIndex((Admin) => Admin.id === parseInt(requestId, 10));

  if (indexOfAdmin !== -1) {
    const {
      id,
      name: oldName,
      lastName: oldLastName,
      email: oldEmail,
      password: oldPassword,
    } = adminList[indexOfAdmin];

    const updatedAdmin = {
      id,
      name: newName || oldName,
      lastName: newLastName || oldLastName,
      email: newEmail || oldEmail,
      password: newPassword || oldPassword,
    };

    adminList[indexOfAdmin] = updatedAdmin;

    fs.writeFile('src/data/admins.json', JSON.stringify(adminList, null, 4), (err) => {
      if (err) {
        res.send(['Error: unable to write into filesystem.', err.toString()].join('\n'));
      } else {
        res.send(`Admin ID ${requestId} successfully updated.`);
      }
    });
  } else {
    res.status(400);
    res.send(`Error: Admin ID ${requestId} was not found.`);
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
    (nameIs || nameContains || lastNameIs || lastNameContains || emailIs || emailContains)
    !== undefined
  ) {
    let filteredAdmins = [...adminList];
    if (nameIs) {
      filteredAdmins = filteredAdmins.filter((sa) => sa.name === nameIs);
    }
    if (nameContains) {
      filteredAdmins = filteredAdmins.filter((sa) => sa.name.includes(nameContains));
    }
    if (lastNameIs) {
      filteredAdmins = filteredAdmins.filter((sa) => sa.lastName === lastNameIs);
    }
    if (lastNameContains) {
      filteredAdmins = filteredAdmins.filter((sa) => sa.lastName.includes(lastNameContains));
    }
    if (emailIs) {
      filteredAdmins = filteredAdmins.filter((sa) => sa.email === emailIs);
    }
    if (emailContains) {
      filteredAdmins = filteredAdmins.filter((sa) => sa.email.includes(emailContains));
    }
    res.send(filteredAdmins);
  } else {
    res.status = 400;
    res.send('Error: no filtering parameters specified.');
  }
});

module.exports = router;
