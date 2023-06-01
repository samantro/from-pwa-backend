const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connect');

const User = sequelize.define("Pet", {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
    tableName: "pet",
    timestamps: false,
});

module.exports = User;
