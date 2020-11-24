"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("shopping_items", "productId", {
      type: Sequelize.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("shopping_items", "shoppingListId", {
      type: Sequelize.INTEGER,
      references: {
        model: "shopping_lists",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("shopping_items", "productId", {});
    await queryInterface.removeColumn("shopping_items", "shoppingListId", {});
  },
};
