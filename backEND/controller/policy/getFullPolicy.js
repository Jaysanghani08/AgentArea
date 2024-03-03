const mongoose = require("mongoose");


const { ObjectId } = require("mongodb");
const db = require("../../connection/connectionMONGO");

const getFullPolicy = async (req,res) => {

    try {
        const policy_number = req.query.policy_number;

        const pipe = [
            {
                $match:{policy_number : policy_number}
            }
        ];

        const dataCollection = db.collection('getPolicies');
        
        const x = await dataCollection.aggregate(pipe).toArray();


        res.status(200).send(x);

    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        console.log("This is error from controllers/policies/getPoliciesAgent.js");
        console.log(error);
        res.status(220).send();
    }

}


module.exports = getFullPolicy;