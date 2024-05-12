const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const router = express.Router();



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./policies");
    },
    filename:(req,file,callback)=>{
        callback(null, req.body.policy_number+file.fieldname+".pdf");
    }
});


const upload = multer({ 
    limits:{
        fileSize: 1024*1024*10
    },
    storage: storage
 });


const addPolicy = require("../../controller/policy/addPolicy");
const getPoliciesAgent = require("../../controller/policy/getPolicyAgent");

const auth = require("../../middleware/auth");
const getFullPolicy = require('../../controller/policy/getFullPolicy');



router.post("/api/policy/addPolicy",auth,upload.fields([
    { name: 'renewal_notice_copy', maxCount: 1 },
    { name: 'policy_copy', maxCount: 1 }]),addPolicy);

router.get("/api/agent/policy/getPolicies",auth,getPoliciesAgent);

router.get("/api/agent/policy/getFullPolicy",auth,getFullPolicy);



module.exports = router;
