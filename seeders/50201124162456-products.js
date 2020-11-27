"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "potato",
          store: "Lidl",
          priceInEuro: 4,
          unit: "5 kilo",
          picture: "",
          quantity: 1,
          lastBought: "2020-11-10",
          categoryId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "rice",
          store: "Lidl",
          priceInEuro: 1,
          unit: "1 kilo",
          picture: "",
          quantity: 2,
          lastBought: "2020-11-10",
          categoryId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "gouda cheese",
          store: "Lidl",
          priceInEuro: 6,
          unit: "500 g",
          picture: "",
          quantity: 1,
          lastBought: "2020-11-10",
          categoryId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "black yarn",
          store: "saturday market",
          priceInEuro: 5,
          unit: "roll",
          picture: "",
          quantity: 1,
          lastBought: "2020-11-14",
          categoryId: 3,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "white yarn",
          store: "saturday market",
          priceInEuro: 5,
          unit: "roll",
          picture: "",
          quantity: 1,
          lastBought: "2020-11-10",
          categoryId: 3,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
