const {DataTypes} = require('sequelize')

const userdepartment = (seq) =>{
    return seq.define('userdepartment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(31),
            references: {
                model: 'users',
                key: 'username'
            }, onDelete: 'CASCADE'
        },
        department: {
            type: DataTypes.STRING(31),
            references: {
                model: 'departments',
                key:'department'
            },onDelete: 'CASCADE'
        }
    });
}

module.exports = userdepartment