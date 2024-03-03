const express = require('express');


const router = express.Router();


const auth = require("../../middleware/auth");




const login = require("../../controller/agent/login");
const updatePassword = require('../../controller/agent/updatePassword');



router.post("/agent/login", login);

router.post('/agent/updatePassword',auth,updatePassword);





module.exports = router;