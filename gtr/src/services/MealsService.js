const Meals = require("../models/Meals");
const BaseService = require("./BaseService");

class MealsService extends BaseService{
    constructor(){
        super(Meals);
    }
    list(){
        return Meals.find({})
        .populate({
            path:"res_id",
            select:"name price"
        })
    }
}


module.exports = new MealsService()