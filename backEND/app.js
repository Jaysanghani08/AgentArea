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




app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))




