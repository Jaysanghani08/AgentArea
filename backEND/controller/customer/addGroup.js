const mongoose = require("mongoose");


const group = require("../../models/customer/group");


const addGroup = async (id) =>{

    try{
        const data = new group({
            id:id
        })
        const save = await data.save();
        return 1;
    } catch(error){
        console.log("This is error from /controller/customer/addGroup.js");
        console.log(error);
        return 0;
    }
} 

module.exports = addGroup;