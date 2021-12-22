const express = require("express");

const ProductController = require("../controllers/Products")
const schemas = require("../validations/Products");
const validate = require("../middlewares/validate")

const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const idChecker = require("../middlewares/idChecker")

const router = express.Router();

router.route("/").get(ProductController.index);
router.route("/:id/add-comment").patch(idChecker,authenticate,validate(schemas.addComment,"body"),ProductController.addComment);


router.route("/").post(authenticateAdmin,validate(schemas.createProduct,"body"),ProductController.create);
router.route("/:id").patch(idChecker,authenticateAdmin, validate(schemas.updateProduct,"body"),ProductController.update);
router.route("/:id").delete(idChecker,authenticateAdmin,ProductController.deleteProduct)
router.route("/:id/add-media").post(idChecker,authenticateAdmin,ProductController.addMedia)
module.exports = router;