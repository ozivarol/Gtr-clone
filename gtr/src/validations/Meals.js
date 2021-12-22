const Joi = require("joi");

const createMeal = Joi.object({
    name:Joi.string().required().min(3),
    price:Joi.string().required().min(1),
    category:Joi.array(),
    detail:Joi.string().required().min(5),


})

const updateMeal = Joi.object({
    name:Joi.string().min(3),
    price:Joi.string().min(1),
    category:Joi.array(),
    detail:Joi.string().min(5),
    

})


module.exports = {
    createMeal,
    updateMeal,
}