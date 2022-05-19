const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER
    },
    created: {
      type: DataTypes.STRING, // Probar boolean
      defaultValue: "true"
    },
  }, { timestamps: false });
};