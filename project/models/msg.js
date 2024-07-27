const {DataTypes} = require('sequelize')

const msg = (seq) =>{
    return seq.define('msg',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //not null
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            allowNull: false,
        },
        chatname: {
            type: DataTypes.STRING,
            references: {
                model: 'chats',
                key: 'chat',
            },onDelete: 'CASCADE'
        },
        talk: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flag: {
            type: DataTypes.BOOLEAN
        }
    });
}

module.exports = msg