const mailTransporter = require("../utils/setup");


// https://codesandbox.io/p/sandbox/email-template-otp-2cfyn2?file=%2Findex.html%3A12%2C7
// Link for templates
 



const otp = async (email,otp) => {

    const date = new Date();
    const istDateTime = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    let data = {
        otp:otp,
        date:istDateTime
    }

    let mailDetails = {
        from: 'Insure Area',
        to: email,
        subject: 'Signup code',
        template: 'signup',
        context:{
            data:data
        }
    };

    const s = await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('This is error from mailer/sendOTP.js');
            console.log(err);
        } else {
            console.log('Email sent successfully');
            return 1;
        }
    });
}

module.exports = otp;