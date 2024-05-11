const express = require('express');


const router = express.Router();

const auth = require("../../middleware/auth");


const addCompany = require("../../controller/company/addCompany");

const addAgency = require("../../controller/company/addAgency");

const removeCompany = require("../../controller/company/removeCompany");

const addProduct = require("../../controller/company/addProduct");

const getCompanies = require("../../controller/company/getCompanies");

const getProducts = require('../../controller/company/getProducts');

const getAgencies = require('../../controller/company/getAgencies');





router.post("/api/company/addCompany",auth,addCompany);

router.post("/api/company/addAgency",auth,addAgency);

router.get("/api/company/removeCompany",auth,removeCompany);

router.post("/api/company/addProduct",auth,addProduct);

router.get("/api/company/getCompanies",auth,getCompanies);

router.get("/api/company/getProducts",auth,getProducts);

router.get("/api/company/getAgencies",auth,getAgencies);

router.get("/api/company/getAgencies",auth,getAgencies);







module.exports = router;
