const express = require('express');


const router = express.Router();

const auth = require("../../middleware/auth");


const addCompany = require("../../controller/company/addCompany");

const addAgency = require("../../controller/company/addAgency");

const removeCompany = require("../../controller/company/removeCompany");

const addProduct = require("../../controller/company/addProduct");

const getCompanies = require("../../controller/company/getCompanies");



router.post("/company/addCompany",auth,addCompany);

router.post("/company/addAgency",auth,addAgency);

router.get("/company/removeCompany",auth,removeCompany);

router.post("/company/addProduct",auth,addProduct);

router.get("/company/getCompanies",auth,getCompanies);



module.exports = router;
