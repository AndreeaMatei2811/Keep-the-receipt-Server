"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      budget.belongsTo(models.category);
    }
  }
  budget.init(
    {
      setBudget: DataTypes.INTEGER,
      actualBudget: DataTypes.INTEGER,
      differenceBudget: DataTypes.INTEGER,
      month: DataTypes.DATEONLY,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "budget",
    }
  );
  return budget;
};
