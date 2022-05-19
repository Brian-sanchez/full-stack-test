const { Router } = require("express");
const { getProductCategories } = require("../controllers/index");
const router = Router();

router.get("/", getProductCategories);

module.exports = router;