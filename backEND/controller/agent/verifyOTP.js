const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


// DB model
const otp = require("../../models/OTP/otp");



// Res codes
// 500 - time out
// 200 - ok
// 288 - invalid
// 400 - server error




const verifyOTP = (async (req, res) => {

    try {
        const email = req.body.email;
        const otp_number = req.body.otp;

        const data = await otp.findOne({ email : email });
        
        if(data == null){
            res.status(500).send();
        }

        const hashed_otp = data.otp;

        const match = await bcrypt.compare(otp_number, hashed_otp);
        if (match) {
            res.status(200).send();
        }
        else {
            res.status(288).send();
        }
    }
    catch(e){
        console.log("There is error from ./controller/agents/verifyOTP");
        console.log(e);
        res.status(400).send();
    }

})

module.exports = verifyOTP;