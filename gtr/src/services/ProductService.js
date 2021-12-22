const Product = require("../models/Products");
const BaseService = require("./BaseService");

class ProductService extends BaseService{
    constructor(){
        super(Product);
    }
    list(){
        return Product.find({})
        .populate({
            path:"user_id",
            select:"first_name email",
        })
        .populate({
            path:"comments",
            populate:{
                path:"user_id",
                select:"first_name",
            }
        })
    }

}




module.exports = new ProductService();