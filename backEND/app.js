const express = require('express');
const cors = require('cors');


const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

require("./connection/connection");


const agent = require("./routes/agent");


app.use(agent);



app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))


module.exports = app;

