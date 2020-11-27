"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shopping_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shopping_item.belongsTo(models.product);
      shopping_item.belongsTo(models.shopping_list);
    }
  }
  shopping_item.init(
    {
      shoppingQuantity: DataTypes.INTEGER,
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shoppingListId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "shopping_item",
    }
  );
  return shopping_item;
};
