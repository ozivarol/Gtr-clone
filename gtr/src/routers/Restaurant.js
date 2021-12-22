const express = require("express");
const ResturantController = require("../controllers/Restaurant");
const schemas = require("../validations/Restaurant");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateOwner = require("../middlewares/authenticateOwner")
const idChecker = require("../middlewares/idChecker")

const router = express.Router()


router.route("/").get(ResturantController.index);
router.route("/add-restaurant").post(authenticate,authenticateOwner,validate(schemas.createRestaurant,"body"),ResturantController.create);
router.route("/update-restaurant").patch(authenticate,authenticateOwner,validate(schemas.updateRestaurant),ResturantController.update)
router.route("/:id/add-media").post(idChecker,authenticateOwner,ResturantController.addMedia);
router.route("/:id").delete(idChecker,authenticateOwner,ResturantController.deleteRestaurant)



module.exports = router;