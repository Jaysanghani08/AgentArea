const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const router = express.Router();



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const addPolicy = require("../../controller/policy/addPolicy");
const getPoliciesAgent = require("../../controller/policy/getPolicyAgent");

const auth = require("../../middleware/auth");



router.post("/policy/addPolicy",auth,upload.fields([
    { name: 'renewal_notice_copy', maxCount: 1 },
    { name: 'policy_copy', maxCount: 1 }]),addPolicy);

router.get("/agent/policy/getPolicies",auth,getPoliciesAgent);



module.exports = router;
