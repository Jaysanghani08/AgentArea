const express = require('express');


const router = express.Router();


const isGroupExist = require("../controller/customer/isGroupExist");

const addMember = require("../controller/customer/addMember");

router.get("/customer/isGroupExist",isGroupExist);

router.post("/customer/addMember",addMember);




module.exports = router;
