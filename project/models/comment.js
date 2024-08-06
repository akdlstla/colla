const {DataTypes} = require('sequelize');

const comment = (seq) =>{
    return seq.define('comment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            allowNull: false, 
        },
        msgId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'msgs',
                key: 'id',
            },onDelete: 'CASCADE'
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    });
}

module.exports = comment