const Moongose = require("mongoose")

const RestaurantSchema = new Moongose.Schema({
    name:String,
    owner_id:{
        type:Moongose.Types.ObjectId,
        ref:"user",
        
    },
    city:String,
    location:String,
    phone:String,
    rate:Number,
    category:[String],
    media:String,
},
    { timestamps: true, versionKey: false }

)


module.exports = Moongose.model("restaurant",RestaurantSchema)