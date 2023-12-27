const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');





const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

require("./connection/connection")


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const addAgent = require("./controller/agent/addAgent");



app.post("/addAgent",upload.array('docs', 2),addAgent);






app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))


