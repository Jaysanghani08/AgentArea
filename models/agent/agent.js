const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { Binary } = require("mongodb");


const Schema = mongoose.Schema({
    name: {
        type: String,
    },
    mobile: {
        type: Number,
        unique: true,
        validate(m) {
            if (validator.isMobilePhone(m)) {
                return true;
            }
            else {
                throw new Error('Invalid Mobile');
            }
        }
    },
    email: {
        type: String,
        unique: true,
        validate(e) {
            if (validator.isEmail(e)) {
                return true;
            }
            else {
                throw new Error('Invalid email');
            }
        },
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: Number
    },
    pan: {
        type: String
    },
    bank: {
        type: String
    },
    bankAccType: {
        type: String
    },
    micr: {
        type: String
    },
    accNumber: {
        type: Number
    },
    bankIFSC: {
        type: String
    },
    changed:{
        type: Number,
        default : 0
    },
    docs:{
        aadhar: String,
        pan: String
    }
})

Schema.pre("save", (async function (next) {

    const password = this.password;
    const pan = this.pan;

    const hashed_pass = await bcrypt.hash(password, 8);
    const hashed_pan = await bcrypt.hash(pan, 8);

    this.password = hashed_pass;
    this.pan = hashed_pan;
    next();
}))

const agent = mongoose.model("agent", Schema);



module.exports = agent;
