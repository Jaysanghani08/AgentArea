const mongoose = require("mongoose");


const company = require("../../models/company/company");


const  getAgencies = async (req,res) =>{

    const id = req.query.id;
    
    try {
        
        const companies = await company.findOne({_id:id}).exec();
        res.status(200).send(companies.agencies);

    } catch (error) {
        console.log("This is error from controller/company/getAgencies.js");
        console.log(error);
        res.status(500).send();
    }


}

module.exports = getAgencies;


