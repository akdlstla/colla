const {DataTypes} = require('sequelize')

const groupuser = (seq) =>{
    return seq.define('groupuser', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        companyName: {
            type: DataTypes.STRING(31),
            references: {
                model: 'groups',
                key: 'companyName'
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