const express = require('express');


const router = express.Router();



const addCompany = require("../controller/company/addCompany");

const addAgency = require("../controller/company/addAgency");

const removeCompany = require("../controller/company/removeCompany");

const addProduct = require("../controller/company/addProduct");

const getCompanies = require("../controller/company/getCompanies");



router.post("/company/addCompany",addCompany);

router.post("/company/addAgency",addAgency);

router.get("/company/removeCompany",removeCompany);

router.post("/company/addProduct",addProduct);

router.get("/company/getCompanies",getCompanies);



module.exports = router;
