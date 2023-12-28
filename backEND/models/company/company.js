const mongoose = require("mongoose");




const Schema = mongoose.Schema({
    name: {
        required:true,
        type: String,
    },
    url: {
        required:true,
        type: String,
    },
    agencies: {
        type: [{
            name: {
                type: String,
            },
            code: {
                type: Number,
            }
        }]
    },
    // email: {
    //     type: String,
    //     validate(e) {
    //         if (validator.isEmail(e)) {
    //             return true;
    //         }
    //         else {
    //             throw new Error('Invalid email');
    //         }
    //     },
    // },
    // mobile: {
    //     type: String,
    //     validate(m) {
    //         if (validator.isMobilePhone(m)) {
    //             return true;
    //         }
    //         else {
    //             throw new Error('Invalid Mobile');
    //         }
    //     }
    // },
    // docs: {
    //     type: [
    //         {
    //             cashless_hospital: {
    //                 originalname: { type: String, required: true },
    //                 buffer: { type: Buffer, required: true },
    //                 mimetype: { type: String, required: true },
    //             },
    //             cashless_garage: {
    //                 originalname: { type: String, required: true },
    //                 buffer: { type: Buffer, required: true },
    //                 mimetype: { type: String, required: true },
    //             },
    //             blacklist: {
    //                 originalname: { type: String, required: true },
    //                 buffer: { type: Buffer, required: true },
    //                 mimetype: { type: String, required: true },
    //             },
    //             claim_from: {
    //                 originalname: { type: String, required: true },
    //                 buffer: { type: Buffer, required: true },
    //                 mimetype: { type: String, required: true },
    //             },
    //         }
    //     ]
    // }
})



const company = mongoose.model("company", Schema);



module.exports = company;
