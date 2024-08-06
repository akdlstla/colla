const {DataTypes} = require('sequelize');

const userchat = (seq) =>{
    return seq.define('userchat', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },onDelete: 'CASCADE'
        },
        chatId: {
            type: DataTypes.INTEGER,
            references:{
                model: 'chats',
                key:'id'
            },onDelete: 'CASCADE'
        }
    });
}

module.exports = userchat