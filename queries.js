const {
  budget,
  category,
  product,
  tip,
  user,
  shopping_item,
  shopping_list,
} = require("./models");

async function productsWithCategory() {
  try {
    const products = await product.findAll();
    return products.map((product) => product.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}
// productsWithCategory().then((products) => console.log(products));

async function categoriesWithProducts() {
  try {
    const categories = await category.findAll({
      include: [product],
    });
    return categories;
  } catch (e) {
    console.error(e);
  }
}
// categoriesWithProducts().then((categories) => console.log(categories));

async function categoriesWithProducts() {
  try {
    const categories = await shopping_list.findAll({
      include: [product],
    });
    return categories.map((category) => category.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}
categoriesWithProducts().then((categories) => console.log(categories));

async function userWithCategory() {
  try {
    const users = await user.findAll({
      include: [tip],
    });
    return users.map((user) => user.get({ plain: true }));
  } catch (e) {
    console.error(e);
  }
}
// userWithCategory().then((users) => console.log(users));
