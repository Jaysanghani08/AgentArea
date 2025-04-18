const mongoose = require("mongoose");
const fs = require("fs");

const agent = require("../../models/agent/agent");
const docsUpload = require("../../blob/azureBlob");



const addAgent = async (req, res) => {

    try {

        const data = req.body;

        // console.log(data);
        // console.log(req.files);
        // console.log(req.files);

        const agent_data = new agent({
            name: data.name,
            bacode: data.bacode,
            mobile: Number(data.mobile),
            email: data.email,
            username: data.username,
            password: data.password,
            address: data.address,
            city: data.city,
            state: data.state,
            pin: Number(data.pin),
            pan: data.panNumber,
            bank: data.bank,
            bankAccType: data.bankAccType,
            micr: data.micr,
            accNumber: Number(data.accNumber),
            bankIFSC: data.bankIFSC
        });

        try {

            // console.log(save);
            
            const aadharURL = await docsUpload("./agentDocs/"+req.body.mobile + "aadharFile.pdf");
            const panURL = await docsUpload("./agentDocs/"+req.body.mobile + "panFile.pdf");
            
            if (panURL == "" || aadharURL == "") {
                fs.unlink("./agentDocs/" + req.body.mobile + "aadharFile.pdf",(error)=>{console.log(error)});
                fs.unlink("./agentDocs/" + req.body.mobile + "panFile.pdf",(err)=>{console.log(err)});
                console.log("This is error from docsUpload Part in controller/agent/addAgent.js");
                res.status(303).send();
            }
            else{
                agent_data.docs.aadhar = aadharURL;
                agent_data.docs.pan = panURL;
    
                const save = await agent_data.save();
                
                // const URLupdate = await agent.updateOne({ mobile: req.body.mobile },
                //     {
                //         $set: {
                //             'docs.aadhar': aadharURL,
                //             'docs.pan': panURL,
                //         }
                //     });
    
                await fs.unlink("./agentDocs/" + req.body.mobile + "aadharFile.pdf",(err)=>{console.log(err)});
                await fs.unlink("./agentDocs/" + req.body.mobile + "panFile.pdf",(err)=>{console.log(err)});
    
    
                res.status(200).send();
            }

           

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
                res.status(501).send("Bad Request");
            }

        }

    } catch (error) {
        console.log("This is error from addAgent.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = addAgent;
