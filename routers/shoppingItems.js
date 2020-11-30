const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;
const User = require("../models").user;
const ShoppingItem = require("../models").shopping_item;

const router = new Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const shoppingItems = await ShoppingItem.findAll();
    res.json(shoppingItems);
  } catch (e) {
    next(e);
  }
});

router.post("/:id/addProduct", auth, async (req, res) => {
  const findUser = await User.findByPk(req.params.id);

  if (!findUser.userId === req.user.id) {
    return res.status(403).send({
      message: "You are not authorized to add product to shopping list",
    });
  }
  const { productId, shoppingListId, shoppingQuantity } = req.body;
  const findProduct = await Product.findByPk(productId);

  const shoppingItem = await ShoppingItem.findAll();
  console.log("do I", shoppingItem);

  const productsIdShopping = shoppingItem.map((item) => {
    return item.productId;
  });

  console.log("do I productsIdShopping", productsIdShopping);

  if (productsIdShopping.includes(findProduct.id)) {
    return res.status(200).send({
      message: `${findProduct.name} already in to shopping list!`,
    });
  } else {
    const addedProduct = await ShoppingItem.create({
      shoppingListId: findUser.id,
      productId: productId,
      shoppingQuantity: 1,
    });
    return res.status(201).send({
      message: `${findProduct.name} added to shopping list!`,
      addedProduct,
    });
  }
});

router.delete("/:id/checkProduct/:productId", auth, async (req, res, next) => {
  try {
    const findUser = await User.findByPk(req.params.id);
    const findProduct = await Product.findByPk(req.params.productId);

    if (!findUser.userId === req.user.id) {
      return res
        .status(403)
        .send({ message: "You are not authorized to check products" });
    }

    const shoppingItem = await ShoppingItem.findAll();

    const itemToCheck = await shoppingItem.find((item) => {
      return item.productId === findProduct.id;
    });
    console.log("item to check", itemToCheck);

    const checkItem = await itemToCheck.destroy();
    res.json(checkItem);
  } catch (e) {
    next(e);
  }
  return res.status(201).send({ message: "Product checked", checkItem });
});

module.exports = router;
