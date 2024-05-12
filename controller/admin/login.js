const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');





const admin = require("../../models/admin/admin");


// error code
// 202 wrong password
// 404 not Exist
// 400 server Error
// 200 OK



const login = async(req,res)=>{

    try {
        const data = req.body;

        const adminData = await admin.findOne({id:data.id});
        
        if(adminData){
            const hashed_pass = adminData.password;

            const check = await bcrypt.compare(data.password,hashed_pass);
            
            if(check){
                // APPROVED
                const token = jwt.sign(
                    {
                        phone: adminData.id,
                        // type:"admin"
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                res.status(200).send({token:token,type:"admin"});
            }
            else{
                // console.log("Wrong Password");
                res.status(202).send({message : "Wrong Password"});
            }
        }
        else{
            // console.log("Not Exist");
            res.status(404).send({message : "Not Exist"});
        }

    } catch (error) {
        console.log("This is Error from /controller/admin/login.js");
        console.log(error);
        res.status(400).send();
    }


}


module.exports = login;