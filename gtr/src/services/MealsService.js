const Meals = require("../models/Meals");
const BaseService = require("./BaseService");

class MealsService extends BaseService{
    constructor(){
        super(Meals);
    }
    list(where){
        return Meals.find(where || {})
        .populate({
            path:"owner_id",
            select:"_id first_name last_name"
        })
        .populate({
            path:"res_id",
            select:"_id",
        })
      
    }
}


module.exports = new MealsService()