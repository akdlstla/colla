const {DataTypes} = require('sequelize')

const msg = (seq) =>{
    return seq.define('msg',{
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
        chatId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'chats',
                key: 'id',
            },onDelete: 'CASCADE'
        },
        talk: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flag: {
            type: DataTypes.BOOLEAN
        },
        talkname: {
            type: DataTypes.STRING(31),
        }

    });
}

module.exports = msg