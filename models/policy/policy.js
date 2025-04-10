const mongoose = require("mongoose");

const chequeDetails = mongoose.Schema({
    chequeNumber: {
        type: String,
    },
    chequeDate: {
        type: Date,
    },
    payment_bank_branch: {
        type: String,
    }
})

const motor_insurance_details = mongoose.Schema({
    idv: {
        type: Number,
    },
    tp_premium: {
        type: Number,
    },
    od_premium: {
        type: Number,
    },
    registration_number: {
        type: String,
    }
})



const Schema = mongoose.Schema({
    agent_id: {
        type: mongoose.ObjectId,
        ref: 'agent'
    },
    customer_id: {
        type: mongoose.ObjectId,
        ref: 'customer'
    },
    policy_number: {
        type: String,
        unique: true
    },
    group_code: {
        type: mongoose.ObjectId,
        ref: 'customer'
    },
    policy_type: {
        type: String,
        // enum: ['motor', 'health', 'sme'],
    },
    policy_sub_type: {
        type: String
    },
    company_id: {
        type: mongoose.ObjectId,
        ref: 'company'
    },
    product_id: {
        type: mongoose.ObjectId,
        ref: 'company'
    },
    agency: {
        type: mongoose.ObjectId,
        ref: 'company'
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
    pay_id: {
        typr: String
    },
    // For details about policytype for diffrent attribute for motor insurance
    motor_insurance_details: { type: motor_insurance_details },
    gst: {
        type: Number,
    },
    total_premium_amount: {
        type: Number,
    },
    payment_type: {
        type: String,
    },
    cheque_details: { type: chequeDetails },
    premium_deposite_date: {
        type: Date,
    },
    sum_assured: {
        type: Number,
    },
    remark: {
        type: String
    },
    docs: {
        policy_copy: String,
        renewal_notice_copy: String
    }
})


const policy = mongoose.model("policy", Schema);




module.exports = policy;
