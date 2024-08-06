const {DataTypes} = require('sequelize')

const group = (seq) =>{
    return seq.define('group', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        companyName: {
            type: DataTypes.STRING(31),
            allowNull: false,
            unique: true
        },
        department:{
            type: DataTypes.STRING(31),
        },
    });
}

module.exports = group;