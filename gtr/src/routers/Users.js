const express = require("express")
const UserController = require("../controllers/Users")
const schemas = require("../validations/Users")
const validate = require("../middlewares/validate")
const authenticate = require("../middlewares/authenticate");
const autheticateAdmin = require("../middlewares/authenticateAdmin")

const router = express.Router()








router.route("/register").post(validate(schemas.createUser,"body"),UserController.create);
router.route("/login").post(validate(schemas.loginValidation,"body"),UserController.login);
router.route("/createAdminUser").post(autheticateAdmin,validate(schemas.createAdminUser,"body"),UserController.create);
router.route("/reset-password").post(validate(schemas.resetPasswordValidation),UserController.resetPassword);
router.route("/:id").delete(autheticateAdmin,UserController.deleteUser)
router.route("/:id").patch(authenticate, validate(schemas.updateUser,"body"),UserController.updateUser);
router.route("/change-password").post(authenticate,validate(schemas.changePassword),UserController.changePassword)
router.route("/createOwnerUser").post(authenticate,validate(schemas.ownerUser),UserController.create);


router.route("/").get(autheticateAdmin,UserController.index);











module.exports = router;