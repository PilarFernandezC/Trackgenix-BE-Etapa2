const express = require('express');

const router = express.Router();
const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

router.get('/:id', (req, res) => {
  const superAdminId = req.params.id;
  const superAdminFound = superAdmins.some((superAdmin) => superAdmin.id
  === parseInt(superAdminId, 10));
  if (superAdminFound) {
    res.json(superAdmins.filter((superAdmin) => superAdmin.id === parseInt(superAdminId, 10)));
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
  superAdmins.push(newSuperAdmin);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 4), (error) => {
    if (error) {
      res.status(400).json({ msg: 'ERROR! Could not create a SuperAdmin' });
    }
    res.send(`SuperAdmin ${req.body.name} ${req.body.lastName} created`);
  });
});

router.delete('/delete/:id', (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const superAdminToDelete = superAdmins.some((superAdmin) => superAdmin.id === superAdminId);
  if (superAdminToDelete) {
    const remainingSuperAdmins = superAdmins.filter((superAdmin) => superAdmin.id !== superAdminId);
    fs.writeFile('src/data/super-admins.json', JSON.stringify(remainingSuperAdmins, null, 4), (err) => {
      if (err) {
        res.send('Failed deleting super admin');
      } else {
        res.send('Super admin deleted successfully');
      }
    });
  } else {
    res.send('ID does not exist');
  }
});

router.get('/getAll', (req, res) => {
  res.send(superAdmins);
});

router.put('/editById/:id', (req, res) => {
  const requestId = parseInt(req.params.id, 10);
  const {
    name: newName,
    lastName: newLastName,
    email: newEmail,
    password: newPassword,
  } = req.body;
  const indexOfSAdmin = superAdmins.findIndex((sAdmin) => sAdmin.id === requestId);
  if (indexOfSAdmin !== -1) {
    const {
      id,
      name: oldName,
      lastName: oldLastName,
      email: oldEmail,
      password: oldPassword,
    } = superAdmins[indexOfSAdmin];
    const updatedSAdmin = {
      id,
      name: newName || oldName,
      lastName: newLastName || oldLastName,
      email: newEmail || oldEmail,
      password: newPassword || oldPassword,
    };
    superAdmins[indexOfSAdmin] = updatedSAdmin;
    fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins, null, 4), (err) => {
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
router.get('/filterBy/:filters', (req, res) => {
  // filters values are separated by ',' and '*' ignores a filtering parameter
  const [
    nameIs,
    nameContains,
    lastNameIs,
    lastNameContains,
    emailIs,
    emailContains,
  ] = req.params.filters.split(',').map((filter) => (filter !== '*' ? filter : undefined));
  if (
    (nameIs
    || nameContains
    || lastNameIs
    || lastNameContains
    || emailIs
    || emailContains) !== undefined
  ) {
    let filteredSAdmins = [...superAdmins];
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
