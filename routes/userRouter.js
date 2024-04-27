const express = require("express");
const router = express.Router();

const {user_signup} = require("../controller/Auth");
const {user_login} = require("../controller/Auth");
const {changeCredentials} = require ("../controller/Auth");

router.post('/signup',user_signup);
router.post('/signin',user_login);
router.post('/change_cred',changeCredentials);


module.exports = router;