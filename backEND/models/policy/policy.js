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
    agent_id:{
        type:mongoose.ObjectId,
        ref:'agent'
    },
    customer_id:{
        type:mongoose.ObjectId,
        ref:'customer'
    },
    policy_number: {
        type: String,
        unique: true
    },
    group_code: {
        type: mongoose.ObjectId,
        ref:'customer'
    },
    policy_type: {
        type: String,
        // enum: ['motor', 'health', 'sme'],
    },
    company_id:{
        type:mongoose.ObjectId,
        ref:'company'
    },
    product_id: {
        type: mongoose.ObjectId,
        ref:'company'
    },
    agency: {
        type: mongoose.ObjectId,
        ref:'company'
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
    motor_insurance_details: {type:motor_insurance_details},
    gst: {
        type: Number,
    },
    total_premium_amount: {
        type: Number,
    },
    payment_type: {
        type: String,
    },
    cheque_details: {type:chequeDetails},
    premium_deposite_date:{
        type:Date,
    },
    sum_assured:{
        type:Number,
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
