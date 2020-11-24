"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.category);
      product.belongsTo(models.shopping_item);
    }
  }
  product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      store: DataTypes.STRING,
      priceInEuro: DataTypes.INTEGER,
      unit: DataTypes.STRING,
      picture: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      lastBought: DataTypes.DATE,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
