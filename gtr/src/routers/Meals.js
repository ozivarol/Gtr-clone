const express = require("express");


const MealsController = require("../controllers/Meals");
const schemas = require("../validations/Meals")
const validate = require("../middlewares/validate");

const authenticate = require("../middlewares/authenticate")
const authenticateAdmin = require("../middlewares/authenticateAdmin")
const authenticateOwner = require("../middlewares/authenticateOwner");
const idChecker = require("../middlewares/idChecker");

const router = express.Router()

router.route("/").get(MealsController.index);
router.route("/").post(authenticateOwner,validate(schemas.createMeal,"body"),MealsController.create);



module.exports = router