const express = require('express');


const router = express.Router();


const auth = require("../../middleware/auth");




const login = require("../../controller/agent/login");
const updatePassword = require('../../controller/agent/updatePassword');

const forgotPasswordOTP = require('../../controller/agent/forgotPasswordOTP');

const forgotPassword = require('../../controller/agent/forgotPassword');





router.post("/agent/login", login);

router.post('/agent/updatePassword',auth,updatePassword);

router.post("/agent/forgotPasswordOTP",forgotPasswordOTP);

router.post("/agent/forgotPassword",forgotPassword);





module.exports = router;