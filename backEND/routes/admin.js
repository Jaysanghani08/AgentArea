const express = require('express');


const router = express.Router();

const login = require("../controller/admin/login");


router.post("/admin/login",login);


module.exports = router;
