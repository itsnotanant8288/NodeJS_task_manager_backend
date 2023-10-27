const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const authJwt = require("../middleware/middleware");

// // Example usage:
router.post('/signUpUser',controller.signUpUser);

router.post('/login',controller.login);

module.exports = router;
