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
        }
        if (type == "health") {
            const update = await company.updateOne({ _id: id }, { $push: { health: product } });
            console.log(update);
            res.status(200).send();
        }
        else if (type == "motor") {
            const update = await company.updateOne({ _id: id }, { $push: { motor: product } });
            console.log(update);
            res.status(200).send();
        }
        else if (type == "sme") {
            const update = await company.updateOne({ _id: id }, { $push: { sme: product } });
            console.log(update);
            res.status(200).send();
        }

    } catch (error) {
        console.log("THis is the error from /controller/company/addProduct.js");
        console.log(error);
        res.status(500).send();
    }



}


module.exports = addProduct;