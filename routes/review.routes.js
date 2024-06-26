const express= require("express");
const { createReview, getAllReviews } = require("../controllers/review.controller");
const Authenticate = require("../middleware/authenticate");

const router= express.Router();

router.route("/:productId").post(createReview)
router.route("/:productId").get(getAllReviews)


module.exports=router