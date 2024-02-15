const express = require('express');


const router = express.Router();

const auth = require("../middleware/auth");

const login = require("../controller/admin/login");


router.post("/admin/login",login);

router.post("/token/test",auth,async (req,res)=>{
    console.log("Sucess");
    res.status(200).send();
})


module.exports = router;
