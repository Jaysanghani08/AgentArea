
const group = require("../../models/customer/group");

const isGroupExist = async (req,res) => {

    try {
        
        const id = req.query.id;

        const data = await group.findOne({id});

        if(data){
            res.status(200).send();
        }
        else{
            res.status(201).send();
        }


    } catch (error) {
        console.log("This is error from /controller/customers/isGroupExist.js");
        console.log(error);
        res.status(300).send();
    }

}

module.exports = isGroupExist;