

const express= require("express");
const { createOrder } = require("../controllers/order.controller");
const Authenticate = require("../middleware/authenticate");

const orderRouter= express.Router();


orderRouter.route("/").post(Authenticate,createOrder);


module.exports=orderRouter