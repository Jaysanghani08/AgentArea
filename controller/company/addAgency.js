const mongoose = require("mongoose");



const company = require("../../models/company/company");



const addAgency = async (req, res) => {


    const data = req.body;

    try {
        const company_id = data.id;
        const agency ={
            name : data.name,
            code : Number(data.code)
        }

        const update = await company.updateOne({_id:company_id},{$push :{agencies : agency}});
        // console.log(update);        
        res.status(200).send();

    } catch (error) {

        console.log("This is error from controller/company/addAgency.js");
        console.log(error);
        res.status(300).send();
    }


}

module.exports = addAgency;
