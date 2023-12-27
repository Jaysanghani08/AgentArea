const mongoose = require("mongoose");


const agent = require("../../models/agent/agent");


const  getAgents = async (req,res) =>{

    try {

        const pipe = [
            {
              $project: {
                name:1,
                email:1,
                mobile:1      
              }
            }
          ]
        
        const agents = await agent.aggregate(pipe);
        res.status(200).send(agents);

    } catch (error) {
        console.log("This is error from controller/agent/getAgents.js");
        console.log(error);
    }


}

module.exports = getAgents;