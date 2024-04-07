
const express = require("express");
const { createProduct, getAllProduct } = require("../controllers/product.controller");

const router= express.Router();

const multer = require('multer');

const uploadPath="public/productImages/"

const storage= multer.diskStorage({
    destination:function(req,file,cb){

        cb(null,uploadPath)
    },
    filename:function(req,file,cb){

        cb(null,Date.now()+Math.random()+'-'+file.originalname)
    }
})

const upload= multer({storage:storage})


router.route("/").post(upload.array('images'),createProduct).get(getAllProduct);



module.exports = router;