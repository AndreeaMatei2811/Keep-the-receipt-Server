const { Router } = require("express");
const auth = require("../auth/middleware");
const Category = require("../models").category;
const Product = require("../models").product;
const User = require("../models").user;

const router = new Router();

router.get("/:id", auth, async (req, res, next) => {
  try {
    const userFromId = parseInt(req.params.id);

    const categories = await Category.findAll({
      where: { userId: userFromId },
    });
    res.json(categories);
  } catch (e) {
    next(e);
  }
});

router.post("/:id/newCategory", auth, async (req, res) => {
  const findUser = await User.findByPk(req.params.id);

  if (!findUser.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to create new category" });
  }
  const { name, color } = req.body;

  const newCategory = await Category.create({
    userId: findUser.id,
    name,
    color,
  });

  return res.status(201).send({ message: "Category created", newCategory });
});

router.delete(
  "/:id/deleteCategory/:categoryId",
  auth,
  async (req, res, next) => {
    try {
      const findUser = await User.findByPk(req.params.id);

      if (!findUser.userId === req.user.id) {
        return res
          .status(403)
          .send({ message: "You are not authorized to delete category" });
      }
      const categoryToDelete = await Category.findByPk(req.params.categoryId);

      const deletedCategory = await categoryToDelete.destroy();
      res.json(deletedCategory);
    } catch (e) {
      next(e);
    }
    return res
      .status(201)
      .send({ message: "Category deleted", deletedCategory });
  }
);

module.exports = router;
