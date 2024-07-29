const {DataTypes} = require('sequelize')

const groupuser = (seq) =>{
    return seq.define('groupuser', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'groups',
                key: 'id'
            }, onDelete: 'CASCADE'
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key:'id'
            },onDelete: 'CASCADE'
        }
    });
}

module.exports = groupuser