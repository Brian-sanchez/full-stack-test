const { addProduct, getProductsAPI, getAllProducts } = require("./index");
const { Product, Category } = require("../db");

async function getProducts(req, res) {
   const { name } = req.query;

   try {
        let foundProduct = await getAllProducts();

        if (name) {
            const product = foundProduct.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));

            if (product.length > 0) {
                res.status(200).json(product)
            } else {
                res.status(404).send("Product not found with this name")
            }
        } else {
            res.status(200).json(foundProduct);
        }
   } catch (error) {
       res.status(404).json(error);
   };
};

async function getProductsByID(req, res) {
    const id = req.params.idProduct;
    
    if (id) {
        const productsApi = await getProductsAPI();
        const foundProduct = productsApi.find((p) => p.id === id);

        if (foundProduct) {
            return res.json(foundProduct);
        } else {
            const productDb = await Product.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Category,
                    attributes: ["name"],
                }
            });

            return res.json(productDb);
        };
    } else {
        return res.status(404);
    };
};

async function postProducts(req, res) {
    await addProduct(req, res);
};

async function deleteProduct(req, res) {
    const id = req.params.idProduct;

    try {
        await Product.destroy({ where: { id: id } });
        res.send("The product was delete");
    } catch (error) {
        console.log(error);
    };
};

async function editProduct(req, res) {
    const id = req.params.idProduct;
    const { description, image, category, price } = req.body;
    const name = req.body.name.toLowerCase();

    try {
        await Product.update({
            name,
            description,
            image,
            price
        },
        {
            where: { id: id }
        });

        const categoryDB = await Category.findAll({
            where: { name: category }
        });

        const editProduct = await Product.findByPk(id);
        await editProduct.setCategories(categoryDB);
    } catch (error) {
        console.log(error);
    };
};

module.exports = { getProducts, getProductsByID, postProducts, deleteProduct, editProduct };