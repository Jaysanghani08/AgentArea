const mongoose = require("mongoose");


const policy = require("../../models/policy/policy");


const addMember = require("../../controller/customer/addMember");


const addPolicy = async (req, res) => {

    try {

        const data = req.body;

        // const policy_copy = req.files['policy_copy'][0];
        // const renewal_notice_copy = req.files['renewal_notice_copy'][0];


        // const customer_id = await addMember(data.agent_id,data.name,data.mobile,data.email,data.dob,data.group_id);
        const customer_id = "60a4b1e9c54b0a0012345678";

        const new_policy = new policy({
            customer_id: customer_id,
            policy_number: data.policy_number,
            group_code: data.group_code,
            policy_type: data.policy_type,
            product_id: data.product_id,
            agency: data.agency,
            business_type: data.business_type,
            login_date: data.login_date,
            start_date: data.start_date,
            end_date: data.end_date,
            basic_premium: data.basic_premium,
            commissionable_premium: data.commissionable_premium,
            gst: data.gst,
            total_premium_amount: data.total_premium_amount,
            payment_type: data.payment_type,
            premium_deposite_date: data.premium_deposite_date,
            remark: data.remark,


            // docs: [{
            //     renewal_notice_copy: {
            //         originalname: renewal_notice_copy.originalname,
            //         buffer: renewal_notice_copy.buffer,
            //         mimetype: renewal_notice_copy.mimetype,
            //     },
            //     policy_copy: {
            //         originalname: policy_copy.originalname,
            //         buffer: policy_copy.buffer,
            //         mimetype: policy_copy.mimetype,
            //     },
            // }
            // ],


        });

        if (data.payment_type == "cheque") {
            new_policy.cheque_details = {
                chequeDate: data.chequeDate,
                chequeNumber: data.chequeNumber,
                payment_bank_branch: data.payment_bank_branch,
            }
        }

        if (data.policy_type == "motor") {
            new_policy.motor_insurance_details = {
                idv: data.idv,
                tp_premium: data.tp_premium,
                od_premium: data.od_premium,
                registration_number: data.registration_number,
            };
        }

        console.log(new_policy);

        // const saved = await new_policy.save();

        res.status(200).send();


    } catch (error) {
        console.log("This is error from /controller/policy/addPolicy.js");
        console.log(error);

        const err = error.keyPattern;
        if (err && err.hasOwnProperty('policy_number') == true && err.policy_number == 1) {
            res.status(410).send();
        }
        else {
            res.status(413).send("Bad Request");
        }

    }
}
module.exports = addPolicy;


