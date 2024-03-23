const mongoose = require("mongoose");

const agent = require("../../models/agent/agent");



const addAgent = async (req, res) => {

    try {

        const data = req.body;

        // const aadharFile = req.files['aadharFile'][0];
        // const panFile = req.files['panFile'][0];

        // console.log(data);
        // console.log('*****************')
        // console.log(aadharFile);
        // console.log('*****************')
        // console.log(panFile);

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
            // docs: [{
            //     aadhar: {
            //         originalname: aadharFile.originalname,
            //         buffer: aadharFile.buffer,
            //         mimetype: aadharFile.mimetype,
            //     },
            //     pan: {
            //         originalname: panFile.originalname,
            //         buffer: panFile.buffer,
            //         mimetype: panFile.mimetype,
            //     },
            // }
            // ]
        });

        try {

            const save = await agent_data.save();
            console.log(save);
            res.status(200).send();

        } catch (error) {

            console.log("This is error from controller/agent/addAgent.js");
            console.log(error);
            const err = error.keyPattern;
            // console.log(err);
            if (err && err.hasOwnProperty('email') == true && err.email == 1) {
                res.status(410).send();
            }
            else if (err && err.hasOwnProperty('mobile') == true && err.mobile == 1) {
                res.status(411).send();
            }
            else if (err && err.hasOwnProperty('username') == true && err.username == 1) {
                res.status(412).send();
            }
            else {
                res.status(413).send("Bad Request");
            }

        }

    } catch (error) {
        console.log("This is error from addAgent.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = addAgent;
