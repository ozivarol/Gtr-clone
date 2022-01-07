
const Moongose = require("mongoose");

const MealsSchema = new Moongose.Schema({
    name: String,
    price: String,
    category: [String],
    detail: String,
    owner_id: {
        type: Moongose.Types.ObjectId,
        ref: "user"
    },



},
    { timestamps: true, versionKey: false },
)



module.exports = Moongose.model("meal", MealsSchema)