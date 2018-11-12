const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

module.exports = router;

router.post('/signup', userController.createUser);
router.post('/login', userController.userLogin);