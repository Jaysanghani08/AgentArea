const express = require('express');


const router = express.Router();

const auth = require("../../middleware/auth");




const getCompanies = require("../../controller/company/getCompanies");

const getProducts = require('../../controller/company/getProducts');

const getAgencies = require('../../controller/company/getAgencies');






router.get("/company/getCompanies",auth,getCompanies);

router.get("/company/getProducts",auth,getProducts);

router.get("/company/getAgencies",auth,getAgencies);


module.exports = router;