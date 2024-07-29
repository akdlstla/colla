const {DataTypes} = require('sequelize');
const { department } = require('.');

const user = (seq) =>{
    return seq.define('user',{
        id:{
           type: DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(31),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(31),
            allowNull: false
        },
        department:{
            type: DataTypes.STRING(31),
        }

});
}

module.exports = user;