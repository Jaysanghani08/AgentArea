const mongoose = require("mongoose");


const company = require("../../models/company/company");


const  getCompanies = async (req,res) =>{

    try {
        
        const companies = await company.find({}).exec();
        res.status(200).send(companies);

    } catch (error) {
        console.log("This is error from controller/company/getCompanies.js");
        console.log(error);
        res.status(500).send();
    }


}

module.exports = getCompanies;