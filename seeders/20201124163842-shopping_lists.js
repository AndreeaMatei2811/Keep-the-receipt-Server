"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "shopping_lists",
      [
        {
          name: "",
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "",
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
