const express = require('express');


const router = express.Router();



const addCompany = require("../controller/company/addCompany");

const addAgency = require("../controller/company/addAgency");

const removeCompany = require("../controller/company/removeCompany");



router.post("/company/addCompany",addCompany);

router.post("/company/addAgency",addAgency);

router.geto ("/company/removeCompany",removeCompany);





module.exports = router;
