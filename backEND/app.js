const express = require('express');
const cors = require('cors');
const multer = require('multer');





const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

require("./connection/connection")


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const addAgent = require("./controller/agent/addAgent");



app.post("/addAgent",upload.single('pdf'),addAgent);





app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))


