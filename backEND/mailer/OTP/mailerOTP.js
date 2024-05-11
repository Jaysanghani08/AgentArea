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
                return 0;
            }
        }

        const otp_number = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });

        // sending part...

        obj.otp = otp_number;

        const mailer = await mail(obj,subject,email,template);

        // console.log(mailer);

        // const mailer = 1;
        // const otp_number = 123456;

        if (mailer == 0) {
            return 0;
        }
        else{
            const data = new otp({
                email: email,
                otp: otp_number
            })
            try {
                const saved = await data.save();
                // console.log("saving part");
                return 1;
            } catch (error) {
                console.log("This is error from .mailer/agent/tempOTP.js");
                console.log(error);
                return 0;
            }
        }


        // sending otp



        // response


    } catch (error) {
        console.log("This is error from mailer/agent/tempOTP.js");
        console.log(error);
        return 0;
    }

}


module.exports = tempOTP;
