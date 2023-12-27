const mongoose = require("mongoose");
const multer = require("multer");


const agent = require("../../models/agent/agent");



const addAgent = async (req, res) => {

    console.log("HELLLO");

    try {

        const data = req.body;
        const aadharFile = req.files[0];
        const panFile = req.files[1];

        console.log(data);
        console.log(req.files);

        const agent_data = new agent({
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
            pan: data.panNumber,
            bank: data.bank,
            bankAccType: data.bankAccType,
            micr: data.micr,
            accNumber: data.accNumber,
            bankIFSC: data.bankIFSC,
            docs: [{
                aadhar: {
                    originalname: aadharFile.originalname,
                    buffer: aadharFile.buffer,
                    mimetype: aadharFile.mimetype,
                },
                pan: {
                    originalname: panFile.originalname,
                    buffer: panFile.buffer,
                    mimetype: panFile.mimetype,
                },
            }
            ]
        });

        const save  = await agent.save();
        console.log(save);

    } catch (error) {
        console.log("This is error from addAgent.js");
        consolo.log(error);
    }

}

module.exports = addAgent;
