const mongoose = require("mongoose");

const product = mongoose.Schema({
    product_name: {
        type: String,
    },
    product_type: {
        type: String,
    },
    company_agency: {
        type: mongoose.ObjectId,
    },
    policy_type:{
        type:String,
    }
});



const Schema = mongoose.Schema({
    name: {
        required:true,
        type: String,
        unique:true,
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
    products:[product]
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
