const mongoose = require("mongoose");


const {policy,getPolicies} = require("../../models/policy/policy");
const group = require("../../models/customer/group");
const company = require("../../models/company/company");
const agent = require("../../models/agent/agent");


const getPolicy = async (req,res) => {

    try {
        const db = mongoose.connection;
        // console.log(db);
        // const data = await policy.connection().getPolicies.find({}, { _id: 0 } ).exec();
        const x = await getPolicies.find().exec();

        console.log(x);
        res.status(200).send();
    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        console.log("This is error from controllers/policies/getPolicies.js");
        console.log(error);
        res.status(220).send();
    }

}


module.exports = getPolicy;