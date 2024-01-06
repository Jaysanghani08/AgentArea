const mongoose = require("mongoose");

const chequeDetails = mongoose.Schema({
    chequeNumber: {
        type: String,
        validate: {
            validator: function () {
                return this.payment_type === 'cheque';
            },
            // message: 'Cheque number is required for cheque payments.'
        }
    },
    chequeDate: {
        type: Date,
        validate: {
            validator: function () {
                return this.payment_type === 'cheque';
            },
            // message: 'Cheque date is required for cheque payments.'
        }
    },
    payment_bank_branch: {
        type: String,
        validate: {
            validator: function () {
                return this.payment_type === 'cheque';
            },
            // message: 'Cheque date is required for cheque payments.'
        }
    }
})

const motor_insurance_details = mongoose.Schema({
    idv: {
        type: Number,
        validate: {
            validator: function () {
                return this.policy_type === 'motor';
            },
            // message: 'Cheque number is required for cheque payments.'
        }
    },
    tp_premium: {
        type: Number,
        validate: {
            validator: function () {
                return this.policy_type === 'motor';
            },
            // message: 'Cheque number is required for cheque payments.'
        }
    },
    od_premium: {
        type: Number,
        validate: {
            validator: function () {
                return this.policy_type === 'motor';
            },
            // message: 'Cheque number is required for cheque payments.'
        }
    },
    registration_number: {
        type: String,
        validate: {
            validator: function () {
                return this.policy_type === 'motor';
            },
            // message: 'Cheque number is required for cheque payments.'
        }
    }
})




const Schema = mongoose.Schema({
    customer_id:{
        type:mongoose.ObjectId,
    },
    policy_number: {
        type: String,
        unique: true
    },
    group_code: {
        type: mongoose.ObjectId,
    },
    policy_type: {
        type: String,
        // enum: ['motor', 'health', 'sme'],
    },
    product_id: {
        type: mongoose.ObjectId,
    },
    agency: {
        type: mongoose.ObjectId,
    },
    business_type: {
        type: String,
    },
    login_date: {
        type: Date,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    basic_premium: {
        type: Number,
    },
    commissionable_premium: {
        type: Number,
    },
    // For details about policytype for diffrent attribute for motor insurance
    motor_insurance_details: {motor_insurance_details},
    gst: {
        type: Number,
    },
    total_premium_amount: {
        type: Number,
    },
    payment_type: {
        type: String,
    },
    cheque_details: {chequeDetails},
    premium_deposite_date:{
        type:Date,
    },
    remark:{
        type:String
    },
    docs: {
        type: [
            {
                policy_copy: {
                    originalname: { type: String, required: true },
                    buffer: { type: Buffer, required: true },
                    mimetype: { type: String, required: true },
                },
                renewal_notice_copy: {
                    originalname: { type: String, required: true },
                    buffer: { type: Buffer, required: true },
                    mimetype: { type: String, required: true },
                }
            }
        ]
    }
})


const policy = mongoose.model("policy",Schema);

module.exports = policy;
