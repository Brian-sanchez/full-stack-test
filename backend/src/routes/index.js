const { Router } = require('express');
const Product = require('./product');
const Category = require('./category');

const router = Router();

router.use("/products", Product);
router.use("/category", Category);

module.exports = router;