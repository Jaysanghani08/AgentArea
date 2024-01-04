const express = require('express');


const router = express.Router();


const isGroupExist = require("../controller/customer/isGroupExist");


router.get("/customer/isGroupExist",isGroupExist);



module.exports = router;
