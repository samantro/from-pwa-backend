const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connect');

const User = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Photo_Id: {
        type: DataTypes.BLOB('long')
    }
},
    {
        timestamps: false,
    });

module.exports = User;
