'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.user = require('./user')(sequelize)
db.chat = require('./chat')(sequelize)
db.chatlist = require('./chatlist')(sequelize)
db.department = require('./department')(sequelize)
db.userdepartment = require('./userdepartment')(sequelize)
db.msg = require('./msg')(sequelize)
db.comment = require('./comment')(sequelize)

db.user.belongsToMany(db.department,{through: db.userdepartment, foreignKey:'username', onDelete: 'CASCADE'})
db.department.belongsToMany(db.user,{through: db.userdepartment, foreignKey:'department', onDelete: 'CASCADE'})
db.user.belongsToMany(db.chat,{through: db.chatlist, foreignKey:'username', onDelete: 'CASCADE'})
db.chat.belongsToMany(db.user,{through: db.chatlist, foreignKey:'chat', onDelete: 'CASCADE'})
db.chat.hasMany(db.msg, {foreignKey:'chatname', onDelete: 'CASCADE'})
db.msg.belongsTo(db.chat, {foreignKey:'chatname',onDelete: 'CASCADE'})
db.msg.hasMany(db.comment, {foreignKey:'msgid', onDelete: 'CASCADE'})
db.comment.belongsTo(db.msg, {foreignKey:'msgid', onDelete: 'CASCADE'})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
