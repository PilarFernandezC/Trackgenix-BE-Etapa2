const express = require('express');
const dataValidator = require('../validations/employee');
const dbController = require('../controllers/employee');

const router = express.Router();

router.post('/', dataValidator, dbController.create);

module.exports = router;
