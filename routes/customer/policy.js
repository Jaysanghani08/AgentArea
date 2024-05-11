const express = require('express');


const router = express.Router();




const login = require('../../controller/customer/login');

const verifyOTP = require('../../controller/customer/verifyOTP');

const auth = require("../../middleware/auth");



router.post('/customer/login',login);

router.post('/customer/verifyOTP',verifyOTP);   



module.exports = router;
