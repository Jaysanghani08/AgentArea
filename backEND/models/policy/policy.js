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
    },
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
    company_id:{
        type:mongoose.ObjectId,
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


const getPolicies = mongoose.model('getPolicies', Schema);


// First, create the User model's underlying collection...
// policy.createCollection();
// Then create the `RedactedUser` model's underlying collection
// as a View.
getPolicies.createCollection({
  viewOn: 'policies', // Set `viewOn` to the collection name, **not** model name.
  pipeline: [
    {
      $lookup: {
        from: 'groups',
        localField: 'group_code',
        foreignField: '_id',
        as: 'group'
      }
    },
    {
      $unwind: {
        path: '$group',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$group.members',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$group.members._id',
            '$customer_id'
          ]
        }
      }
    },
    {
      $lookup: {
        from: 'agents',
        localField: 'agent_id',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              name: 1,
              email: 1,
              mobile: 1
            }
          }
        ],
        as: 'agent'
      }
    },
    {
      $lookup: {
        from: 'companies',
        localField: 'company_id',
        foreignField: '_id',
        as: 'company'
      }
    },
    {
      $unwind: {
        path: '$company',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$company.products',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$company.products._id',
            '$product_id'
          ]
        }
      }
    },
    {
      $unwind: {
        path: '$company.agencies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        $expr: {
          $eq: [
            '$company.agencies._id',
            '$agency'
          ]
        }
      }
    },
    {
      $unwind: {
        path: '$agent',
        preserveNullAndEmptyArrays: true
      }
    }
  ]
});

module.exports = {policy,getPolicies};
