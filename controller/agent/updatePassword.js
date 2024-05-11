const bcrypt = require("bcryptjs");


const agent = require("../../models/agent/agent");



const updatePassword = async (req,res) => {

    try{

        const mobile = req.body.mobile;
        const oldPassword = req.body.old;
        const newPassword = req.body.new;

        const data = await agent.findOne({mobile:mobile});

        const hashed = data.password;

        const check = await bcrypt.compare(oldPassword,hashed);

        if(!check){
            res.status(202).send();
        }

        const newHashed = await bcrypt.hash(newPassword,8);

        const update = await agent.updateOne({mobile:mobile},{password:newHashed,changed:1});

        res.status(200).send();



    }catch(e){
        console.log("This is error from /controller/agent/updatePassword.js");
        console.log(e);
        res.status(300).send();
    }

}


module.exports = updatePassword;
