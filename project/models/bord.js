const {DataTypes} = require('sequelize')

const bord = (seq) =>{
    return seq.define('bord',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'users',
                key:'id'
            },onDelete:'CASCADE'
        },
        type: {
            type: DataTypes.STRING(31),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contents: DataTypes.TEXT('medium'),
    });
}

module.exports = bord