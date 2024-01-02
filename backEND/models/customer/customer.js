const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const customer = mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: number,
        required: true,
        unique: true,
        validate(m) {
            if (validator.isMobilePhone(m)) {
                return true;
            }
            else {
                return false;
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(e) {
            if (validator.isEmail(e)) {
                return true;
            }
            else {
                return false;
            }
        },
    },
    username: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
        type:Number
    },
})

schema.pre("save",(async function(next){

    const password = this.password;

    const hashed_pass = await bcrypt.hash(password,5);

    this.password = hashed_pass;
    next();
}))



const user = mongoose.model("user",schema);

module.exports = user;