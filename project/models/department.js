const {DataTypes} = require('sequelize')

const department = (seq) =>{
    return seq.define('department', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        department: {
            type: DataTypes.STRING(31),
            allowNull: false
        }
    });
}

module.exports = department;