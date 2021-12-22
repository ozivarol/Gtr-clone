const Joi = require("joi")

const createRestaurant = Joi.object({
    name:Joi.string().required().min(3),
    city:Joi.string().required().min(3),
    location:Joi.string().required().min(3),
    category:Joi.array(),

})
const updateRestaurant = Joi.object({
    name:Joi.string().min(3),
    city:Joi.string().min(3),
    location:Joi.string().min(3),
    

})





module.exports = {
    createRestaurant,
    updateRestaurant,
}