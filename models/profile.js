'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Post)
    }

    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }

    static genderPronoun(gender){
      if (gender == "Female"){
        return "Mrs"
      }else if (gender == "Male"){
        return "Mr"
      }
    }

    hiddenPhoneNumber(){
        if (typeof this.phone !== 'string' || this.phone.length < 2) {
          return this.phone;
        }
        const countryCode = this.phone.slice(0, 3);
        const rest = this.phone.slice(3).replace(/\d/g, '*');
        return `${countryCode}${rest}`;
    }
  }
  Profile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};