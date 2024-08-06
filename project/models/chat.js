const {DataTypes} = require('sequelize')

const chat = (seq) =>{
    return seq.define('chat',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        chat: {
            type: DataTypes.STRING(255),
            allowNull:false,
            unique: true,
        },
        flag:{
            type:DataTypes.BOOLEAN
        }
    });
}

module.exports = chat