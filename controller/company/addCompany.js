const mongoose = require("mongoose");


const company = require("../../models/company/company");



const addCompany = async (req, res) => {


    const data = req.body;

    // const cashless_hospital = req.files['hospital'][0];
    // const cashless_garage = req.files['garage'][0];
    // const blocklist = req.files['blocklist'][0];
    // const claimform = req.files['claimform'][0];

    // console.log(data);


    const company_data = new company({
        name: data.name,
        url: data.url,
    });

    try {

        const save = await company_data.save();
        // console.log(save);
        res.status(200).send();

    } catch (error) {

        console.log("This is error from controller/company/addCompany.js");
        console.log(error);
        res.status(300).send();
    }



}

module.exports = addCompany;
