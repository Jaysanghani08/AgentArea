const mongoose = require("mongoose");
const fs = require("fs");



const policy = require("../../models/policy/policy");
const docsUpload = require("../../blob/azureBlob");



const addPolicy = async (req, res) => {

    try {

        const data = req.body;
        // console.log(data);
        const agent_id = req.user.id;

        // console.log(agent_id);
        // console.log(req.files);

        // const policy_copy = req.files['policy_copy'][0];
        // const renewal_notice_copy = req.files['renewal_notice_copy'][0];

        const new_policy = new policy({
            agent_id:agent_id,
            customer_id: data.customer_id,
            policy_number: data.policy_number,
            group_code: data.group_code,
            policy_type: data.policy_type,
            policy_sub_type: data.policy_sub_type,
            company_id : data.company_id,
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
            sum_assured : data.sum_assured,
            remark: data.remark,

            cheque_details: (data.payment_type == 'cheque') ? {
                // pass date in "yyyy/mm/dd" format,
                chequeDate: Date.parse(data.chequeDate),
                chequeNumber: data.chequeNumber,
                payment_bank_branch: data.payment_bank_branch,
            } : undefined,

            motor_insurance_details: (data.policy_type == "motor") ? {
                idv: data.idv,
                tp_premium: data.tp_premium,
                od_premium: data.od_premium,
                registration_number: data.registration_number,
            } : undefined
        });


    const saved = await new_policy.save();


    const renewal_notice_copyURL = await docsUpload("./policies/"+req.body.policy_number + "renewal_notice_copy");
    const policy_copyURL = await docsUpload("./policies/"+req.body.policy_number + "policy_copy");


    const URLupdate = await policy.updateOne({ policy_number: req.body.policy_number },
        {
            $set: {
                'docs.renewal_notice_copy': renewal_notice_copyURL,
                'docs.policy_copy': policy_copyURL,
            }
        });

    fs.unlink("../../policies/" + req.body.policy_number + "renewal_notice_copy",(err)=>{console.log(err)});
    fs.unlink("../../policies/" + req.body.policy_number + "policy_copy",(err)=>{console.log(err)});

    res.status(200).send();


} catch (error) {
    console.log("This is error from /controller/policy/addPolicy.js");
    console.log(error);

    const err = error.keyPattern;
    if (err && err.hasOwnProperty('policy_number') == true && err.policy_number == 1) {
        res.status(410).send();
    }
    else {
        res.status(473).send("Bad Request");
    }

}
}

module.exports = addPolicy;










