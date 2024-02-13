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


const agent = require("./routes/agent");
const company = require("./routes/company");
const customer = require("./routes/customer");
const policy = require("./routes/policy");
const admin = require("./routes/admin");


app.use(agent);
app.use(company);
app.use(customer);
app.use(policy);
app.use(admin);


// for testing a dummy listener

app.get("/test/encrypt",async (req,res)=>{
    const password = "shubham464";
    const hashed = await bcrypt.hash(password,9);
    console.log(hashed);
    res.status(200).send();
})





app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))




