const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        }, 
        user_id: {
            type: Sequelize.UUID,
        },
        description: {
            type: Sequelize.STRING,
        },
        is_deleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
    })
    return Task;
  };
  
  