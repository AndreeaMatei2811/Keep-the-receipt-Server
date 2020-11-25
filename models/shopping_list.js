"use strict";
const { Model } = require("sequelize");
const shopping_item = require("./shopping_item");
module.exports = (sequelize, DataTypes) => {
  class shopping_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shopping_list.belongsTo(models.category);
      shopping_list.belongsToMany(models.product, {
        through: "shopping_item",
        foreignKey: "shoppingListId",
      });
    }
  }
  shopping_list.init(
    {
      name: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "shopping_list",
    }
  );
  return shopping_list;
};
