const mongoose = require("mongoose");


const db = require("../../connection/connectionMONGO");

const getPolicy = async (req,res) => {

    try {
        const dataCollection = db.collection('getPolicies');
        const pipe = [
            {
              $project: {
                policy_number: 1,
                policy_type: 1,
                business_type: 1,
                'agent.name': 1,
                'group.members.mobile': 1,
                'company.name': 1,
                'group.members.name': 1,
                'company.products.product_name': 1,
                'company.agencies.name': 1,
                _id: 0, // Exclude the _id field if you don't need it in the output
              },
            },
        ];

        const x = await dataCollection.aggregate(pipe).toArray();

        // console.log(x);

        res.status(200).send(x);
        
    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        console.log("This is error from controllers/policies/getPoliciesAdmin.js");
        console.log(error);
        res.status(220).send();
    }

}


module.exports = getPolicy;