const mongoose = require("mongoose");


const group = require("../../models/customer/group");


const addMember = async (agent,name,mobile,email,dob,group_id) => {

    try {
        
        const member = {
            agent : agent,
            name : name,
            mobile : mobile,
            email : email,
            dob : dob
        }

        const update = await group.updateOne({id:group_id},{$push : { members : member }});

        return 1;

    } catch (error) {
        console.log("This is error from /controller/customers/addMember.js");
        console.log(error);
    }

}

module.exports = addMember;