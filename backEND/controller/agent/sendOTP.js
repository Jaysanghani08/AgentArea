const otpGenerator = require('otp-generator')


const otp = require("../../models/OTP/otp");
const agent = require("../../models/agent/agent");



const mailerOTP = require("./../../mailer/OTP/mailerOTP");


// res codes
// 222 - user already exist
// 500,400,300 - server error,
// 200 - done




const sendOTP = async (req,res) => {

    const email = req.body.email;
    const name = req.body.name;
    const mobile = req.body.mobile; 
    const username = req.body.username; 

    const match = await agent.findOne({email: email});
    const match2 = await agent.findOne({mobile:mobile});
    const match3 = await agent.findOne({username:username});

    if (match) {
        res.status(201).send();
    }
    else if(match2){
        res.status(202).send();
    }
    else if(match3){
        res.status(203).send();
    }
    else {
        const match = await otp.findOne({ email: email });
        if (match) {
            try {
                await otp.deleteOne({ email: email });
            } catch (error) {
                console.log("This is error from ./controllers/agents/sendOTP.js");
                console.log(error);
                res.status(500);
                return;
            }
        }

        const obj = {
            name : name
        }

        console.log("JJJ");

        const mailer = await mailerOTP("Sign up OTP",obj,email,"signupOTP");

        if(mailer==1){
            res.status(200).send();
        }
        else{
            res.status(300).send();
        }

    }
}

module.exports = sendOTP;