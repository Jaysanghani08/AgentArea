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






router.post("/agent/addAgent",upload.array('docs', 2),addAgent);

router.get("/agent/getFullAgent",getFullAgent);

router.get("/agent/getAgents",getAgents);











module.exports = router;