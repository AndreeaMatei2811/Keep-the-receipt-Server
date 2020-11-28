const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;
const User = require("../models").user;
const ShoppingItem = require("../models").shopping_item;

const router = new Router();

router.get("/:id", auth, async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);

    const products = await Product.findAll({
      where: { userId: findUser.id },
      order: [["name", "ASC"]],
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
  const { name, store, priceInEuro, unit, quantity } = req.body;

  const newProduct = await Product.create({
    categoryId: findCategory.id,
    userId: findUser.id,
    name,
    store,
    priceInEuro,
    unit,
    quantity: quantity ? quantity : 1,
  });
  console.log("what is new product", newProduct);

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

router.patch("/:productId/decrease", auth, async (req, res, next) => {
  try {
    productToDecrease = await Product.findByPk(req.params.productId);

    // const decreasedQuantity = productToDecrease.quantity - 1;
    const { quantity } = req.body;

    const decreasedProduct = await productToDecrease.update({
      quantity: quantity,
    });
    res.json(decreasedProduct);
  } catch (e) {
    next(e);
  }
  // return res.status(200).send({ decreasedProduct });
});

router.patch("/:productId/increase", auth, async (req, res, next) => {
  try {
    productToIncrease = await Product.findByPk(req.params.productId);

    // const increasedQuantity = productToIncrease.quantity + 1;

    const { quantity } = req.body;

    const increasedProduct = await productToIncrease.update({
      quantity: quantity,
    });
    res.json(increasedProduct);
  } catch (e) {
    next(e);
  }
  // return res.status(200).send({ increasedProduct });
});

router.post("/:id/:productId/addProduct", auth, async (req, res) => {
  const findUser = await User.findByPk(req.params.id);
  const findCategory = await Category.findByPk(req.params.categoryId);

  if (!findUser.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to create new product" });
  }

  const newProduct = await ShoppingItem.create();
  console.log("what is new product", newProduct);

  return res.status(201).send({ message: "Product created", newProduct });
});

module.exports = router;
