const mongoose = require("mongoose");

const agent = require("../../models/agent/agent");
const { ObjectId } = require("mongodb");

const getFullAgent = async (req, res) => {

    try {

        const id = req.query.id;

        const pipe = [
            {
                $match:
                {
                    _id:new ObjectId(id),
                },
            }
        ]

        const agent_data = await agent.aggregate(pipe);
        res.status(200).send(agent_data);



    } catch (error) {
        console.log("This error from controller/agent/getFullAgent.js");
        console.log(error);
        res.status(500).send();
    }

}

module.exports = getFullAgent;