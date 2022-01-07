const Joi = require("joi")
const { validationErrorHandlig } = require("./validationErrorHandler")

const createUser = Joi.object({
    first_name: Joi.string().min(3).required().optional(),
    last_name: Joi.string().required().min(3),
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(8),
    phones: Joi.string().required().min(8),
    isOwner: Joi.boolean().default(false),
    isAdmin: Joi.boolean().default(false),
    isCosmuter: Joi.boolean().default(true),

})

const updateUser = Joi.object({
    first_name: Joi.string().required().min(3),
    last_name: Joi.string().required().min(3),
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(8),
    phones: Joi.string().required().min(8),

    addresses: Joi.array(),
})


const userQuery = Joi.object({
    id: Joi.string().required().min(2),
    location: Joi.string().required().min(2),
})

const loginValidation = Joi.object({
    email: Joi.string().required().min(8),
    password: Joi.string().required().min(8),

})

const createAdminUser = Joi.object({
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(8),
    isAdmin: Joi.boolean().default(false),
});

const resetPasswordValidation = Joi.object({


    email: Joi.string().email().required().min(8),
})

const changePassword = Joi.object({
    password: Joi.string().required().min(8),
})

const ownerUser = Joi.object({
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    email: Joi.string().email().required().min(8),
    password: Joi.string().required().min(8),
    isOwner: Joi.boolean().default(false)

})

module.exports = {
    createUser,
    userQuery,
    updateUser,
    loginValidation,
    createAdminUser,
    resetPasswordValidation,
    changePassword,
    ownerUser,
}