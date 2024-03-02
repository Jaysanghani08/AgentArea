const mongoose = require("mongoose");

const agent = require("../../models/agent/agent");

const deleteAgent = async (req, res) => {

    try {

        const id = req.query.id;

        const agent_data = await agent.deleteOne({_id:id});
        res.status(200).send();



    } catch (error) {
        console.log("This error from controller/agent/deleteAgent.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = deleteAgent;