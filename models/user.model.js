const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        }, 
        email: {
            type: Sequelize.STRING,
        },
        user_name: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    })
    return User;
  };
  
  