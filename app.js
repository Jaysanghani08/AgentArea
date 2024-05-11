const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cors());

console.log(__dirname + '/frontend/build/index.html')
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

const customer_ = require("./routes/customer/policy");


app.use(agent);
app.use(adminAgent);
app.use(agentCompany);
app.use(adminCompany);
app.use(Customer);
app.use(policy);
app.use(admin);
app.use(adminPolicy);
app.use(customer_);

app.use(express.static(__dirname + '/frontend/build'));
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
});

// for testing a dummy listener

app.get("/api/test/encrypt",async (req,res)=>{
    const password = "shubham464";
    const hashed = await bcrypt.hash(password,9);
    console.log(hashed);
    res.status(200).send();
})

const tempMail = require("./mailer/OTP/mailerOTP");

app.get("/api/test",async (req,res)=>{
    const obj = {
        name:"Shubham"
    }
    await tempMail("Sign UP CODE",obj,"shubhampatel12233@gmail.com","signupOTP");
    res.status(200).send();
})








app.listen(8080,(()=>{
    console.log("Listening on 8080");
}))




