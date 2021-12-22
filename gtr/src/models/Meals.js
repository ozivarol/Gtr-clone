
const Moongose = require("mongoose");

const MealsSchema = new Moongose.Schema({
    name:String,
    price:String,
    category:[String],
    detail:String,
    res_id:{
        type:Moongose.Types.ObjectId,
        ref:"restaurant"
    },},
    {timestamps:true,versionKey:false},
    )



module.exports = Moongose.model("meals",MealsSchema)