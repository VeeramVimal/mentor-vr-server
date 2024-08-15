const express = require("express");
const { userController } = require("../controllers/index");
const router = express.Router();

//= ===============================
// user API routes
//= ===============================
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.get('/', userController.getAllUser);
router.post('/forgetPassword', userController.forgetPassword);
router.put('/resetPasswort', userController.resetPassword);
// router.get('/verify', userController.activateAccount)

module.exports = router;