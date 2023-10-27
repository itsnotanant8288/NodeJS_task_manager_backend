const express = require('express');
const router = express.Router();
const controller = require('../controllers/task.controller');
const authJwt = require("../middleware/middleware");

// // Example usage:
router.post('/addTask',[authJwt.verifyToken,authJwt.verifyUser],controller.addTask);

router.delete('/deleteTask',[authJwt.verifyToken,authJwt.verifyUser],controller.deleteTask);

router.put('/updateTask',[authJwt.verifyToken,authJwt.verifyUser],controller.updateTask);

router.get('/readTask',[authJwt.verifyToken,authJwt.verifyUser],controller.readTask);

router.get('/getAllTask',[authJwt.verifyToken,authJwt.verifyUser],controller.getAllTask);

module.exports = router;
