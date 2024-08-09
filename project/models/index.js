'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.user = require('./user')(sequelize)
db.chat = require('./chat')(sequelize)
db.userchat = require('./userchat')(sequelize)
db.group = require('./group')(sequelize)
db.groupuser = require('./groupuser')(sequelize)
db.msg = require('./msg')(sequelize)
db.comment = require('./comment')(sequelize)
db.bord = require('./bord')(sequelize)

db.user.hasMany(db.groupuser,{foreignKey:'userId', onDelete:'CASCADE'})
db.groupuser.belongsTo(db.user,{foreignKey:'userId', onDelete:'CASCADE'})
db.group.hasMany(db.groupuser,{foreignKey:'companyName', onDelete:'CASCADE'})
db.groupuser.belongsTo(db.group,{foreignKey:'companyName', onDelete:'CASCADE'})



db.user.hasMany(db.userchat,{foreignKey:'userId', onDelete:'CASCADE'})
db.chat.hasMany(db.userchat,{foreignKey:'chatId', onDelete:'CASCADE'})
db.userchat.belongsTo(db.user, {foreignKey:'userId',onDelete: 'CASCADE'})
db.userchat.belongsTo(db.user, {foreignKey:'chatId',onDelete: 'CASCADE'})
db.chat.hasMany(db.msg, {foreignKey:'chatId', onDelete: 'CASCADE'})
db.msg.belongsTo(db.chat, {foreignKey:'chatId',onDelete: 'CASCADE'})
db.msg.hasMany(db.comment, {foreignKey:'msgId', onDelete: 'CASCADE'})
db.comment.belongsTo(db.msg, {foreignKey:'msgId', onDelete: 'CASCADE'})
db.user.hasMany(db.msg,{foreignKey:'userId', onDelete: 'CASCADE'})
db.msg.belongsTo(db.user, {foreignKey:'userId', onDelete: 'CASCADE'})
db.user.hasMany(db.bord,{foreignKey:'userId', onDelete: 'CASCADE'})
db.bord.belongsTo(db.user, {foreignKey:'userId', onDelete: 'CASCADE'})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
