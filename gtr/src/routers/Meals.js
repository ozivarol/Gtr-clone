const express = require("express");


const MealsController = require("../controllers/Meals");
const schemas = require("../validations/Meals")
const validate = require("../middlewares/validate");
const idChecker = require("../middlewares/idChecker")
const authenticate = require("../middlewares/authenticate")
const authenticateAdmin = require("../middlewares/authenticateAdmin")
const authenticateOwner = require("../middlewares/authenticateOwner");


const router = express.Router()

router.route("/").get(MealsController.index);
router.route("/add-meal").post(authenticateOwner, validate(schemas.createMeal, "body"), MealsController.create);
router.route("/:id").delete(idChecker, authenticateOwner, MealsController.deleteMeal)



module.exports = router