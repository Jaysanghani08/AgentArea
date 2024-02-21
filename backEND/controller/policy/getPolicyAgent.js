const mongoose = require("mongoose");


const db = require("../../connection/connectionMONGO");
const { ObjectId } = require("mongodb");

const getPolicy = async (req,res) => {

    try {
        const agent_id = req.user.id;
        // console.log(agent_id);
        const dataCollection = db.collection('getPolicies');
        const x = await dataCollection.find({agent_id:new ObjectId(agent_id)}).toArray();

        // console.log(x);
        res.status(200).send(x);
    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        console.log("This is error from controllers/policies/getPoliciesAgent.js");
        console.log(error);
        res.status(220).send();
    }

}


module.exports = getPolicy;