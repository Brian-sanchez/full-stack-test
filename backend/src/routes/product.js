const { Router } =require("express");
const router = Router();
const { getProducts, getProductsByID, postProducts, deleteProduct, editProduct } = require ("../controllers/product");

router.get("/", getProducts);
router.get("/:idProduct", getProductsByID);
router.post("/", postProducts);
router.delete("/delete/:idProduct", deleteProduct);
router.put("/edit/:idProduct", editProduct);

module.exports = router;