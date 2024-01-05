const mongoose = require("mongoose");


const customer = mongoose.Schema({
    agent_id:{
        type: mongoose.ObjectId,
        ref: 'agent'
    },
    name :{
        type:String,
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String,
    },
    dob :{
        type:Date,
    }
})

const Schema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    members:{type:[customer]}
})




const group = mongoose.model("group",Schema);

module.exports = group;