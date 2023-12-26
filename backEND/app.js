const express = require('express');
const cors = require('cors');





const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

require("./connection/connection")



app.post("/addAgent",upload.single('pdf'),)





app.listen(7000,(()=>{
    console.log("Listening on 7000");
}))


