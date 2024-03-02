const express = require('express');


const router = express.Router();


const getPolicies = require("../../controller/policy/getPolicyAdmin");


const auth = require("../../middleware/auth");


router.get("/admin/policy/getPolicies",auth,getPolicies);


module.exports = router;
