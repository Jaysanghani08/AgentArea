const mongoose = require("mongoose");


const customer = mongoose.Schema({
    agent:{
        type: mongoose.ObjectId
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
        type: number,
        required: true,
        unique: true,
    },
    members:{type:[customer]}
})




const group = mongoose.model("group",Schema);

module.exports = group;