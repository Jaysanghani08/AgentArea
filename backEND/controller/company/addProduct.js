const mongoose = require("mongoose");

const company = require("../../models/company/company");


const addProduct = async (req, res) => {

    try {

        const data = req.body;

        const type = data.type;
        const id = data.company_id

        const product = {
            product_name: data.product_name,
            product_type: data.product_type,
            company_agency: data.agency_id,
            policy_type: data.policy_type
        }

        const update = await company.updateOne({ _id: id }, { $push: { products: product } });
        console.log(update);
        res.status(200).send();

    } catch (error) {
        console.log("THis is the error from /controller/company/addProduct.js");
        console.log(error);
        res.status(500).send();
    }



}


module.exports = addProduct;