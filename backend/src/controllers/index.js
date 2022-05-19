const { Product, Category } = require("../db");
const products = require('../productos.json'); // My API

async function getProductsAPI() {
  try {
    return products;
  } catch (error) {
    return error;
  };
};

async function getAllProducts() {
  const dbProducts = await Product.findAll({
    include: {
      model: Category,
      attributes: ["name"],
    },
  });

  const ApiProducts = await getProductsAPI();

  const allProducts = await ApiProducts.concat(dbProducts);

  return allProducts;
};

async function addProduct(req, res) {
  const { name, description, image, category, price } = req.body;
  
  if (!image) { 
    try {
      image = "https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg";
    } catch (error) {
      console.log(error)
    }
  };

  if (name && description && category && price && image) {
    let productCreated = await Product.create({
      name: name,
      description: description, 
      price: price,
      image: image,
      created: "true"
    });
    
    let findCategoryDB = await Category.findAll({ where: { name: category } });
    productCreated.addCategory(findCategoryDB);
    res.status(200).send(productCreated);
  } else {
    res.status(404).send("Please, complete all the fields");
  }

};

async function getProductCategories(req, res) {
  try {
    const categories = products.map((e) => e.category)
    categories.map((e) => {
      Category.findOrCreate({
        where: { name: e }
      });
    });

    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (error) {
    console.log(error)
  }
};

module.exports = { getProductsAPI, getAllProducts, addProduct, getProductCategories };