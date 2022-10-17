const express = require('express');
const dataValidator = require('../validations/employee');
const dbController = require('../controllers/employee');

const router = express.Router();

router.post('/', dataValidator, dbController.create);
router.get('/', dbController.filter);

module.exports = router;
