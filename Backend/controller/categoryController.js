const Category = require('../models/Category');

exports.getCategory = async(req,res )=> {
    try {
        const data = await Category.find();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({message:"Error Fetching",error});
    }
};