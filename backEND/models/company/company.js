const mongoose = require("mongoose");




const Schema = mongoose.Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
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
    mobile: {
        type: String,
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
    agencies: {
        type: [{
            name: {
                type: String,
            }
        }]
    },
    docs: {
        type: [
            {
                cashless_hospital: {
                    originalname: { type: String, required: true },
                    buffer: { type: Buffer, required: true },
                    mimetype: { type: String, required: true },
                },
                cashless_garage: {
                    originalname: { type: String, required: true },
                    buffer: { type: Buffer, required: true },
                    mimetype: { type: String, required: true },
                },
                blacklist: {
                    originalname: { type: String, required: true },
                    buffer: { type: Buffer, required: true },
                    mimetype: { type: String, required: true },
                },
                claim_from: {
                    originalname: { type: String, required: true },
                    buffer: { type: Buffer, required: true },
                    mimetype: { type: String, required: true },
                },
            }
        ]
    }
})



const company = mongoose.model("company", Schema);



module.exports = company;
