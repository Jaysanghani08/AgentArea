const mongoose = require("mongoose");


const customer = mongoose.Schema({
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
        unique: true,
    },
    members:{type:[customer]}
})




const group = mongoose.model("group",Schema);

module.exports = group;