const Restaurant = require("../models/Restaurant");
const BaseService = require("./BaseService");

class RestaurantService extends BaseService{
    constructor(){
        super(Restaurant);

    }
    list(){
        return Restaurant.find({})
        .populate({
            path:"owner_id",
            select:"first_name last_name",
        })
    }
} 


module.exports = new RestaurantService()