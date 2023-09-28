'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsToMany(models.Post, {through : 'PostTag'})
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "nama Tag tidak boleh kosong"
        },
        notNull : {
          args: true,
          msg: "nama Tag tidak boleh kosong"
        },
      }
    }
  }, {hooks: {
    beforeCreate: (tag,options) => {
     tag.name = `#${tag.name}`
    }
  },
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};