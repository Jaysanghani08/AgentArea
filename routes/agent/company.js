const express = require('express');


const router = express.Router();

const auth = require("../../middleware/auth");




const getCompanies = require("../../controller/company/getCompanies");

const getProducts = require('../../controller/company/getProducts');

const getAgencies = require('../../controller/company/getAgencies');






router.get("/api/company/getCompanies",auth,getCompanies);

router.get("/api/company/getProducts",auth,getProducts);

router.get("/api/company/getAgencies",auth,getAgencies);


module.exports = router;