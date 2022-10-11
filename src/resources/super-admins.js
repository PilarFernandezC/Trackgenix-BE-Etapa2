const express = require('express');

const fs = require('fs');

const superAdmins = require('../data/super-admins.json');

const router = express.Router();

router.delete('/delete/:id', (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const superAdminDelete = superAdmins.some((superAdmin) => superAdmin.id === superAdminId);
  if (superAdminDelete) {
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

module.exports = router;
