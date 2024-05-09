const db = require("../../connection/connectionMONGO");
const OTP = require("../../models/OTP/otp");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const verifyOTP = async (req,res) => {

    try {

        const data = req.body;

        const otp = await OTP.findOne({ email : data.email });
        
        if(otp == null){
            res.status(500).send({message:"OTP NOT FOUND"});
        }

        const hashed_otp = otp.otp;

        const match = await bcrypt.compare(data.otp, hashed_otp);

        if (match == false) {
            res.status(288).send({message:"OTP INVALID"});
        }

        // Policie Data

        const pipe = [
            {
                $match:{'group.members.mobile':data.mobile, 'group.members.email':data.email}
            }
        ];

        const dataCollection = db.collection('CustomerPolicies');
        
        const x = await dataCollection.aggregate(pipe).toArray();

        // console.log(x);

        // JWT
        const token = await jwt.sign(
            {
                phone: data.mobile,
                email: data.email
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).send({data:x,token:token,type:"customer"});
    } catch (error) {
        console.log("This is error from ./controller/customers/verifyOTP.js");
        console.log(error);
        res.status(500).send();
    }
}

module.exports = verifyOTP;