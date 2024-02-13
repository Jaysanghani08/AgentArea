const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


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

const addMember = require("./controller/customer/addMember");
const id = '658bed167dd0bb526193617e';

app.get("/test",async()=>{console.log(await addMember(id,"Shubham",7622051689,"shubham@gmail.com","04/11/2003",9157212522));});



app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))




