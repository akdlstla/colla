const {DataTypes} = require('sequelize');

const chatlist = (seq) =>{
    return seq.define('chatlist', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //not null
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            references: {
                model: 'users',
                key: 'username',
            },onDelete: 'CASCADE'
        },
        chat: {
            type: DataTypes.STRING,
            references:{
                model: 'chats',
                key:'chat'
            },onDelete: 'CASCADE'
        }
    });
}

module.exports = chatlist