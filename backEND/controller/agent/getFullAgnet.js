const mongoose = require("mongoose");

const agent = require("../../models/agent/agent");

const getFullAgent = async (req, res) => {

    try {

        const id = req.query.id;


        const agent_data = await agent.findOne({ _id: id });
        console.log(agent_data);
        res.status(200).send(agent_data);



    } catch (error) {
        console.log("This error from controller/agent/getFullAgent.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = getFullAgent;