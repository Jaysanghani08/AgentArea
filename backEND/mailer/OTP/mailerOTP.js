const otpGenerator = require('otp-generator')



const otp = require("./../../models/OTP/otp");

const mail = require("./sendOTP");



const tempOTP = async (subject,obj,email,template) => {

    try {

        // generateOTP and save

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

        const otp_number = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        // sending part...

        obj.otp = otp_number;

        const mailer = mail(obj,subject,email,template);


        if (mailer == 0) {
            return 0;
        }
        const data = new otp({
            email: email,
            otp: otp_number
        })
        try {
            const saved = await data.save();
            return 1;
        } catch (error) {
            console.log("This is error from .mailer/agent/tempOTP.js");
            console.log(error);
            return 0;
        }


        // sending otp



        // response


    } catch (error) {
        console.log("This is error from mailer/agent/tempOTP.js");
        console.log(error);
    }

}


module.exports = tempOTP;
