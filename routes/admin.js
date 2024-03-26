const express = require("express");
const multer = require("multer");
// const bodyParser = require("body-parser");

const ProductController = require ("../controllers/admin/ProductsControllers");
const router = express.Router();

const upload = multer({ dest: './public/images' })
  


router.get('/list-product', ProductController.getProduct);
router.get('/add-product',ProductController.addProduct);
router.post('/add-product',upload.single('images'),ProductController.postProduct);
module.exports = router;