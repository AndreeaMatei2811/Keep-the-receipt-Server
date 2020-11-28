const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;
const User = require("../models").user;
const ShoppingItem = require("../models").shopping_item;
const ShoppingList = require("../models").shopping_list;

const router = new Router();

router.get("/:id", auth, async (req, res, next) => {
  const findUser = await User.findByPk(req.params.id);
  try {
    const shoppingList = await ShoppingList.findAll({
      where: { userId: findUser.id },
      include: [Product],
    });
    console.log(shoppingList[0].products);
    res.json(shoppingList[0].products);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
