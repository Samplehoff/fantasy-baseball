'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, { tableName: 'users' });

  User.hashPassword = function (newPassword) {
    return bcrypt.hashSync(newPassword, saltRounds);
  }

  User.prototype.comparePassword = function (newPassword) {
    return bcrypt.compareSync(newPassword, this.password);
  }

  return User;
};