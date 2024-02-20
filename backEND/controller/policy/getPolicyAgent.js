const mongoose = require("mongoose");


const db = require("../../connection/connectionMONGO");

const getPolicy = async (req,res) => {

    try {
        const dataCollection = db.collection('getPolicies');
        const x = await dataCollection.find({_id:req.user.id}).toArray();

        console.log(x);
        res.status(200).send(x);
    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        console.log("This is error from controllers/policies/getPoliciesAgent.js");
        console.log(error);
        res.status(220).send();
    }

}


module.exports = getPolicy;