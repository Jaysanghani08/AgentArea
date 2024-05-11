const express = require('express');


const router = express.Router();

const auth = require("../../middleware/auth");


const isGroupExist = require("../../controller/customer/isGroupExist");

const addMember = require("../../controller/customer/addMember");



router.get("/api/customer/isGroupExist",auth,isGroupExist);

router.post("/api/customer/addMember",auth,addMember);




module.exports = router;
