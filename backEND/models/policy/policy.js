const mongoose = require("mongoose");

// Agency ID no datatype jovano 6 


const Schema = mongoose.Schema({
    product_name: {
        type: String,
    },
    type: {
        type: String,
    },
    company_name: {
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
    company_agency: {
        type: String,
        
    },
    company_id: {
        type: mongoose.ObjectId
    }
})



const company = mongoose.model("company", Schema);



module.exports = company;
