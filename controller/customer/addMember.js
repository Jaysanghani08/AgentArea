const mongoose = require("mongoose");

const group = require("../../models/customer/group");


const addMember = async (req, res) => {

    try {

        const data = req.body;
        const ifExist = await group.findOne({ id: data.group_code });

        const responseObj = {};

        
        if (!ifExist) {
            
            try {
                
                const GroupData = new group({
                    id: Number(data.group_code)
                })

                const saved_data = await GroupData.save();
                responseObj.group_id = saved_data._id;
                responseObj.group_code = saved_data.id;
                // console.log(saved_data);
                
            } catch (error) {
                console.log("This is error from /controller/customers/addMember.js ((group creation part))");
                console.log(error);
                res.status(500).send({ "error": "Internal Server Error" });
            }
            
        }
        else{
            responseObj.group_id = ifExist._id;
        }


        const member = {
            agent_id: data.agent_id,
            name: data.name,
            mobile: Number(data.mobile),
            email: data.email,
            dob: data.dob
        }

        const update = await group.findOneAndUpdate({ id: data.group_id }, { $push: { members: member } }, { new: true });

        responseObj.customer_id = update.members[update.members.length - 1]._id;

        res.status(200).send(responseObj);


    } catch (error) {
        console.log("This is error from /controller/customers/addMember.js");
        console.log(error);
        res.status(500).send({ "error": "Internal Server Error" });
    }

}

module.exports = addMember;