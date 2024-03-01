const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const router = express.Router();



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const auth = require("../../middleware/auth");


const getAgents = require("../../controller/agent/getAgents");
const addAgent = require("../../controller/agent/addAgent");
const getFullAgent = require("../../controller/agent/getFullAgnet");
const sendOTP = require('../../controller/agent/sendOTP');
const verifyOTP = require('../../controller/agent/verifyOTP');



router.post("/agent/addAgent", upload.fields([
    { name: 'aadharFile', maxCount: 1 },
    { name: 'panFile', maxCount: 1 }])
    ,auth, addAgent);

router.get("/agent/getFullAgent",auth, getFullAgent);

router.get("/agent/getAgents", auth,getAgents);

router.post("/agent/mailer/sendOTP",auth,sendOTP);

router.post("/agent/verifyOTP",auth,verifyOTP);



module.exports = router;
