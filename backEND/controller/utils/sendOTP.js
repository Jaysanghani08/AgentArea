// const otp = 

const otpGenerator = require('otp-generator')





const otp = require("../../models/OTP/otp");
const agent = require("../../models/agent/agent");




const otp = async (req,res) => {

    const email = req.body.email;

    const match = await agent.findOne({ email: email });

    if (match) {
        res.status(222);
    }
    else {
        const match = await otp.findOne({ email: email });
        if (match) {
            try {
                await otp.deleteOne({ email: email });
            } catch (error) {
                console.log("This is error from /controllers/utils/sendOTP.js");
                console.log(error);
                res.status(500);
                return;
            }
        }

        const otp_number = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
        console.log(otp_number);
        const mailer = mail(email, otp_number);
        const data = new otp({
            email: email,
            otp: otp_number
        })
        try {
            const saved = await data.save();
            res.status(200).send();
        } catch (error) {
            console.log("This is error from /controller/utils/sendOTP.js -> mailer part");
            console.log(error);
            res.status(400).send();
        }

    }
}

module.exports = otp;