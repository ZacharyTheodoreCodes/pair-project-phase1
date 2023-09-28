'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Profile)
      Post.belongsToMany(models.Tag, {through : 'PostTag'})
    }
  }
  Post.init({
    ProfileId: DataTypes.INTEGER,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "ImageURL tidak boleh kosong"
        },
        notNull : {
          args: true,
          msg: "ImageURL tidak boleh kosong"
        },
      }
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Caption tidak boleh kosong"
        },
        notNull : {
          args: true,
          msg: "Caption tidak boleh kosong"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};