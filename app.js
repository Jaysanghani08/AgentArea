const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();

const corsOptions = {
    origin: 'https://insurearea.azurewebsites.net'
}

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cors(corsOptions));

// console.log(__dirname + '/frontend/build/index.html')
require("./connection/connection");
require("./connection/connectionMONGO");


const main_route = require("./routes/main_route");


app.use("/",main_route);


app.use(express.static(__dirname + '/frontend/build'));
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/frontend/build/index.html');
});

// for testing a dummy listener

app.post("/api/test/encrypt",async (req,res)=>{
    const password = "Abc123@#$";
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




