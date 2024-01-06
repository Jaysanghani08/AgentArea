const mongoose = require("mongoose");


const group = require("../../models/customer/group");


const addMember = async (agent,name,mobile,email,dob,group_id) => {


    try {
        
        const ifExist = await group.findOne({id:group_id});

        if(!ifExist){

            const data = new group({
                id:group_id
            })

            const saved_data = await data.save();

        }

        const member = {
            agent_id : agent,
            name : name,
            mobile : mobile,
            email : email,
            dob : dob
        }

        const update = await group.findOneAndUpdate({id:group_id},{$push : { members : member }},{new:true});
        const id = update.members[update.members.length - 1]._id;
        return id;


    } catch (error) {
        console.log("This is error from /controller/customers/addMember.js");
        console.log(error);
    }

}

module.exports = addMember;