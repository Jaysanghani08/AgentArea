const express = require('express');


const router = express.Router();


const auth = require("../../middleware/auth");




const login = require("../../controller/agent/login");
const updatePassword = require('../../controller/agent/updatePassword');

const forgotPasswordOTP = require('../../controller/agent/forgotPasswordOTP');

const forgotPassword = require('../../controller/agent/forgotPassword');





router.post("/api/agent/login", login);

router.post('/api/agent/updatePassword',auth,updatePassword);

router.post("/api/agent/forgotPasswordOTP",forgotPasswordOTP);

router.post("/api/agent/forgotPassword",forgotPassword);





module.exports = router;