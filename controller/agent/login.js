const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');





const agnet = require("../../models/agent/agent");


// error code
// 202 wrong password
// 404 not Exist
// 400 server Error
// 200 OK


const login = async(req,res)=>{

    try {
        const data = req.body;
        const mobile = data.id;
        const pipe = [
            {
                $match:
                {
                    mobile:mobile,
                },
            },
            {
                $project:
                {
                    docs: 0,
                },
            }
        ]

        const agentData2 = await agnet.aggregate(pipe);
        const agentData = agentData2[0];
        
        if(agentData){
            const hashed_pass = agentData.password;

            const check = await bcrypt.compare(data.password,hashed_pass);
            
            if(check){
                // APPROVED
                const token = jwt.sign(
                    {
                        phone: agentData.mobile,
                        username: agentData.username,
                        id : agentData._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                res.status(200).send({agentData,token:token,type:"agent"});
            }
            else{
                res.status(202).send();
            }
        }
        else{
            res.status(404).send();
        }

    } catch (error) {
        console.log("This is Error from /controller/agent/login.js");
        console.log(error);
        res.status(400).send();
    }


}


module.exports = login;