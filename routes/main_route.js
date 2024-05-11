const express = require("express");



const router = express.Router();

const adminCompany = require("./admin/company");
const admin = require("./admin/admin");
const adminAgent = require("./admin/agent");
const adminPolicy = require("./admin/policy");

const Customer = require("./agent/customer");
const agent = require("./agent/agent");
const policy = require("./agent/policy");
const agentCompany = require("./agent/company");

const customer_ = require("./customer/policy");



router.use("/",agent);
router.use("/",adminAgent);
router.use("/",agentCompany);
router.use("/",adminCompany);
router.use("/",Customer);
router.use("/",policy);
router.use("/",admin);
router.use("/",adminPolicy);
router.use("/",customer_);


module.exports = router;