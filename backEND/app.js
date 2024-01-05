const express = require('express');
const cors = require('cors');


const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

require("./connection/connection");


const agent = require("./routes/agent");
const company = require("./routes/company");
const customer = require("./routes/customer");


app.use(agent);
app.use(company);
app.use(customer);


// for testing a dummy listener

const addMember = require("./controller/customer/addMember");
const id = '658bed167dd0bb526193617e';

app.get("/test",async()=>{console.log(await addMember(id,"Shubham",7622051689,"shubham@gmail.com","04/11/2003",9157212522));});



app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))




