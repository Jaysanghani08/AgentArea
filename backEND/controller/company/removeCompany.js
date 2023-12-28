const mongoose = require("mongoose");



const company = require("../../models/company/company");



const removeCompany = async (req,res) =>{

    try {
        
        const company_id = req.query.id;

        const dlt = await company.deleteOne({_id:company_id});
        res.status(200).send();

    } catch (error) {
        console.log("This is Error from controller/company/removeCompany.js");
        console.log(error);
        res.status(300).send();
    }

}


module.exports = removeCompany;