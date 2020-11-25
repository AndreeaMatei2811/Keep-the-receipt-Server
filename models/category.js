"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.belongsTo(models.user);
      category.hasMany(models.product);

      category.hasOne(models.shopping_list);
      category.hasOne(models.budget);
    }
  }
  category.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      color: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
