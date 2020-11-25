const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;

const router = new Router();

router.get("/:id", auth, async (req, res, next) => {
  try {
    const userFromId = parseInt(req.params.id);
    const categories = await Category.findAll({
      where: { userId: userFromId },
      include: [Product],
    });
    res.json(categories);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
