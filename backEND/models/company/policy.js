const mongoose = require("mongoose");


const Schema = mongoose.Schema({
    product_name: {
        type: String,
    },
    product_type: {
        type: String,
    },
    company_agency: {
        type: mongoose.ObjectId,
    },
});



module.exports = Schema;
