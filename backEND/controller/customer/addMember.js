const mongoose = require("mongoose");

const group = require("../../models/customer/group");


const addMember = async (req,res) => {

    try {

        const data = req.body;
        const ifExist = await group.findOne({id:data.group_id});

        if(!ifExist){

            const data = new group({
                id:data.group_id
            })

            const saved_data = await data.save();

        }

        const member = {
            agent_id : req.user.id,
            name : data.name,
            mobile : data.mobile,
            email : data.email,
            dob : data.dob
        }

        const update = await group.findOneAndUpdate({id:data.group_id},{$push : { members : member }},{new:true});

        const id = update.members[update.members.length - 1]._id;
        
        res.status(200).send({id:id});


    } catch (error) {
        console.log("This is error from /controller/customers/addMember.js");
        console.log(error);
    }

}

module.exports = addMember;