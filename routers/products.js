const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;
const User = require("../models").user;

const router = new Router();

router.get("/", auth, async (req, res, next) => {
  try {
    // const categoryFromId = parseInt(req.params.categoryId);
    // console.log("what is category id", categoryFromId);

    const products = await Product.findAll({
      // where: { categoryId: categoryFromId },
    });
    res.json(products);
    console.log(products);
  } catch (e) {
    next(e);
  }
});

router.post("/:id/:categoryId/newProduct", auth, async (req, res) => {
  const findUser = await User.findByPk(req.params.id);
  const findCategory = await Category.findByPk(req.params.categoryId);

  if (!findUser.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to create new product" });
  }
  const { name, store, price, unit, lastBought, quantity } = req.body;

  const newProduct = await Product.create({
    categoryId: findCategory.id,
    name,
    store,
    price,
    unit,
    lastBought,
    quantity,
  });

  return res.status(201).send({ message: "Product created", newProduct });
});

router.delete("/:id/deleteProduct/:productId", auth, async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    // const findCategory = await Category.findByPk(req.params.categoryId);

    if (!findUser.userId === req.user.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to delete category" });
    }
    const productToDelete = await Product.findByPk(req.params.productId);

    const deletedProduct = await productToDelete.destroy();
    res.json(deletedProduct);
  } catch (e) {
    next(e);
  }
  return res.status(201).send({ message: "Category deleted", deletedProduct });
});

module.exports = router;
