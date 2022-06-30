'use strict';

module.exports = (sequelize, DataTypes) => {
  const categorieModel = sequelize.define('Category', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
  });

  categorieModel.associate = (models) => {
    categorieModel.hasMany(models.PostCategory, {
      foreignKey: 'categoryId',
    });
  }
  return categorieModel;
}