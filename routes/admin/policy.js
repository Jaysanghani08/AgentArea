const express = require('express');


const router = express.Router();


const getPolicies = require("../../controller/policy/getPolicyAdmin");


const auth = require("../../middleware/auth");
const getFullPolicy = require('../../controller/policy/getFullPolicy');


router.get("/admin/policy/getPolicies",auth,getPolicies);

router.get("/admin/policy/getFullPolicy",auth,getFullPolicy);


module.exports = router;
