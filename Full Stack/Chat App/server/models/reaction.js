"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    static associate({ User, Message }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.belongsTo(Message, { foreignKey: "messageId" });
    }
  }
  Reaction.init(
    {
      content: DataTypes.STRING,
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      messageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reaction",
    }
  );
  return Reaction;
};
