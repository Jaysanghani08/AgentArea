const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const router = express.Router();


const auth = require("../../middleware/auth");


const getAgents = require("../../controller/agent/getAgents");
const addAgent = require("../../controller/agent/addAgent");
const getFullAgent = require("../../controller/agent/getFullAgnet");
const sendOTP = require('../../controller/agent/signupSendOTP');
const verifyOTP = require('../../controller/agent/verifyOTP');
const deleteAgent = require('../../controller/agent/deleteAgent');
const forgotPassword = require('../../controller/agent/forgotPasswordOTP');




router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        // console.log(file);
        callback(null,"./agentDocs");
    },
    filename:(req,file,callback)=>{
        callback(null, req.body.mobile+file.fieldname+".pdf");
    }
});


const upload = multer({ 
    limits:{
        fileSize: 1024*1024*10
    },
    storage: storage
 });

router.post("/api/agent/addAgent",auth,upload.fields([
    { name: 'aadharFile', maxCount: 1 },
    { name: 'panFile', maxCount: 1 }])
    ,addAgent);

router.get("/api/agent/getFullAgent",auth, getFullAgent);

router.get("/api/agent/getAgents", auth,getAgents);

router.post("/api/agent/mailer/sendOTP",auth,sendOTP);

router.post("/api/agent/verifyOTP",verifyOTP);

router.get("/api/agent/deleteAgent",auth,deleteAgent);





module.exports = router;
