const mongoose = require("mongoose");
const multer = require("multer");

// Name
// BA code
// Mobile
// email
// username
// password
// address
// city
// state
// Pin Code
// PAN Number
// Bank Name
// Bank acc, type
// MICR code
// Bank Acc Number
// Bank IFSC/A
// 2 PDF(PAN,AADHAR)

const agent = require("../models/agent/agent");

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


const addAgent = async (req, res) => {

    try {

        const data = req.body;
        const agent = new agent({
            name: data.name,
            bacode: data.bacode,
            mobile: data.mobile,
            email: data.email,
            username: data.username,
            password: data.password,
            address: data.address,
            city: data.city,
            state: data.state,
            pin: data.pin,
            pan: data.pan,
            bank: data.bank,
            bankAccType: data.bankAccType,
            micr: data.micr,
            accNumber: data.accNumber,
            bankIFSC: data.bankIFSC,
            docs :[
                {
                    aadhar: req.file.aadhar,
                },
                {
                    pan : req.file.pan,
                }
            ]
        });

        const save  = await agent.save();
        console.log(save);

    } catch (error) {
        console.log("This is error from addAgent.js");
        consolo.log(error);
    }
6
}