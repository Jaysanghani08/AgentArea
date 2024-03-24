const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cors())

require("./connection/connection");
require("./connection/connectionMONGO");


const adminCompany = require("./routes/admin/company");
const admin = require("./routes/admin/admin");
const adminAgent = require("./routes/admin/agent");
const adminPolicy = require("./routes/admin/policy");


const Customer = require("./routes/agent/customer");
const agent = require("./routes/agent/agent");
const policy = require("./routes/agent/policy");
const agentCompany = require("./routes/agent/company");


app.use(agent);
app.use(adminAgent);
app.use(agentCompany);
app.use(adminCompany);
app.use(Customer);
app.use(policy);
app.use(admin);
app.use(adminPolicy);


// for testing a dummy listener

app.get("/test/encrypt",async (req,res)=>{
    const password = "shubham464";
    const hashed = await bcrypt.hash(password,9);
    console.log(hashed);
    res.status(200).send();
})



const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./docsTemp");
    },
    filename:(req,file,callback)=>{
        callback(null, "resume");
    }
});
const upload = multer({ storage: storage });

const blob = require("./test");

app.post("/test/blob",upload.fields([{ name: 'aadharFile', maxCount: 1 }]),blob);





// Testing for blob









app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))




