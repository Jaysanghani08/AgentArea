const agent = require("../../models/agent/agent");

const mailer = require("../../mailer/OTP/mailerOTP");

// 404 user not found
// 203 email and mobile does not belong to same user....



const forgotPassword = async (req,res) => {

    try {

        const mobile = req.body.mobile;
        const email = req.body.email;

        const dbMobile = await agent.findOne({email:email}).mobile;

        if(!dbMobile){
            res.status(404).send();
        }
        else{
            if(dbMobile == mobile){
                // sendOTP
                const mailer = await mailer()
            }
            else{
                res.status(203).send();
            }
        }


    } catch (error) {
        console.log("This is error from ./controller/agent/forgotPassword.js");
        console.log(error);
        res.status(300).send();
    }

}