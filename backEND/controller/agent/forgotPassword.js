const agent = require("../../models/agent/agent");
const bcrypt = require("bcryptjs");


const forgotPassword = async (req,res) => {
    
    try {

        const email = req.body.email;
        const password = req.body.password;


        const hashedPass = await bcrypt.hash(password,8);

        const update = await agent.updateOne({email:email},{$set:{password:hashedPass}});

        res.status(200).send();

        
    } catch (error) {
        console.log("This is error from ./controller/agent/forgotpassword.js");
        console.log(error);
        res.status(202).send();
    }

}