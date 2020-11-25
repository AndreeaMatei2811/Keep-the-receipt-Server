"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tip.belongsTo(models.user);
    }
  }
  tip.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING,
      link: DataTypes.STRING,
      picture: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "tip",
    }
  );
  return tip;
};
