const mongoose = require("mongoose");
const fs = require("fs");

const agent = require("../../models/agent/agent");
const docsUpload = require("../../blob/azureBlob");



const addAgent = async (req, res) => {

    try {

        const data = req.body;

        // console.log(req.files);

        const aadharFile = req.files['aadharFile'][0];
        const panFile = req.files['panFile'][0];

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
            bankIFSC: data.bankIFSC
        });

        try {

            const save = await agent_data.save();
            // console.log(save);

            const aadharURL = await docsUpload(req.body.mobile + req.files['aadharFile'][0].fieldname);
            const panURL = await docsUpload(req.body.mobile + req.files['panFile'][0].fieldname);

            // if (panURL == "" || aadharURL == "") {
            //     fs.unlink("./../../docsTemp/" + req.body.mobile + req.files['aadharFile'][0].fieldname);
            //     fs.unlink("./../docsTemp/" + req.body.mobile + req.files['panFile'][0].fieldname);
            //     console.log("This is error from docsUpload Part in controller/agent/addAgent.js");
            //     res.status(303).send();
            // }

            const URLupdate = await agent.updateOne({ mobile: req.body.mobile },
                {
                    $set: {
                        'docs.aadhar': aadharURL,
                        'docs.pan': panURL,
                    }
                });

            fs.unlink("../../docsTemp/" + req.body.mobile + "aadharFile",()=>{});
            fs.unlink("../../docsTemp/" + req.body.mobile + "panFile",()=>{});


            res.status(200).send();

        } catch (error) {
            fs.unlink("../../docsTemp/" + req.body.mobile + "aadharFile",()=>{});
            fs.unlink("../../docsTemp/" + req.body.mobile + "panFile",()=>{});
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
