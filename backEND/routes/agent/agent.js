const express = require('express');


const router = express.Router();



const login = require("../../controller/agent/login");



router.post("/agent/login", login);





module.exports = router;