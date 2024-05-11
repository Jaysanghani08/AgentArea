const tempOTP = require("../../mailer/OTP/mailerOTP");
const group = require("../../models/customer/group");


const login = async (req,res) => {

    try {

        const data = req.body;
        // console.log(typeof(data.mobile));
        const isGroup = await group.findOne({id:data.group_id});

        if(!isGroup){
            res.status(400).send({message:"Group not found"});
        }


        const member = await isGroup.members.find(member => ((member.mobile == data.mobile) && (member.email == data.email)));
        

        if(!member){
            res.status(400).send({message:"Member not found"});
        }   
   
   
    
        // Send OTP for verification
        

        const mail = await tempOTP("Customer OTP",{},data.email,"customerOTP");
        
        if(mail){
            res.status(200).send({"message":"OTP sent"});
        }


    } catch (error) {
        console.log("This is error from ./controller/customers/login.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = login;