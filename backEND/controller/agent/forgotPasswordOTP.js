const agent = require("../../models/agent/agent");

const mailer = require("../../mailer/OTP/mailerOTP");

// 404 user not found
// 203 email and mobile does not belong to same user....
// 500 internal server error



const forgotPassword = async (req,res) => {

    try {

        const mobile = req.body.mobile;
        const email = req.body.email;

        const db = await agent.findOne({email:email});
        const dbMobile = db.mobile;
        const name = db.name;

        if(!dbMobile){
            res.status(404).send();
        }
        else{
            if(dbMobile == mobile){
                // sendOTP
                const obj = {
                    name : name
                }
                const mail = await mailer("Forgot Password",obj,email,"forgotPassword");

                if(mail==1){
                    res.status(200).send();
                }
                else{
                    res.status(500).send();
                }

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


module.exports = forgotPassword;