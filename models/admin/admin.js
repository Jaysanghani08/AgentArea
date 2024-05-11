const mongoose = require("mongoose");


const schema = mongoose.Schema({
    id:{
        type:Number,
    },
    password:{
        type:String,
    }
})


schema.pre("save", (async function (next) {

    const password = this.password;

    const hashed_pass = await bcrypt.hash(password, 8);

    this.password = hashed_pass;
    next();
}))


const admin = mongoose.model("admin",schema);

module.exports = admin;
