const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const router = express.Router();


const auth = require("../../middleware/auth");


const getAgents = require("../../controller/agent/getAgents");
const addAgent = require("../../controller/agent/addAgent");
const getFullAgent = require("../../controller/agent/getFullAgnet");
const sendOTP = require('../../controller/agent/sendOTP');
const verifyOTP = require('../../controller/agent/verifyOTP');
const deleteAgent = require('../../controller/agent/deleteAgent');



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./agentDocs");
    },
    filename:(req,file,callback)=>{
        callback(null, req.body.mobile+file.fieldname.pdf);
    }
});


const upload = multer({ storage: storage });



router.post("/agent/addAgent",auth,upload.fields([
    { name: 'aadharFile', maxCount: 1 },
    { name: 'panFile', maxCount: 1 }])
    ,addAgent);

router.get("/agent/getFullAgent",auth, getFullAgent);

router.get("/agent/getAgents", auth,getAgents);

router.post("/agent/mailer/sendOTP",auth,sendOTP);

router.post("/agent/verifyOTP",auth,verifyOTP);

router.get("/agent/deleteAgent",auth,deleteAgent)



module.exports = router;
