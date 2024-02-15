const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');



const router = express.Router();



router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const getAgents = require("../controller/agent/getAgents");

const addAgent = require("../controller/agent/addAgent");

const getFullAgent = require("../controller/agent/getFullAgnet");

const login = require("../controller/agent/login");






router.post("/agent/addAgent", upload.fields([
    { name: 'aadharFile', maxCount: 1 },
    { name: 'panFile', maxCount: 1 }])
    , addAgent);

router.get("/agent/getFullAgent", getFullAgent);

router.get("/agent/getAgents", getAgents);

router.post("/agent/login", login);











module.exports = router;