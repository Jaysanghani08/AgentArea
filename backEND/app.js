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


const company = require("./routes/admin/company");
const admin = require("./routes/admin/admin");
const adminAgent = require("./routes/admin/agent");
const adminPolicy = require("./routes/admin/policy");


const Customer = require("./routes/agent/customer");
const agent = require("./routes/agent/agent");
const policy = require("./routes/agent/policy");


app.use(agent);
app.use(adminAgent);
app.use(company);
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


const testEmail = require("./mailer/agent/signup");

app.get("/test/mail",(req,res) => {
    testEmail("shubhampatel12233@gmail.com",123123,"Shubham")
});





app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))




