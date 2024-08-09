const express = require("express");
const {signup, login, search, searchUser, createChat, createUserChat, createMsg, connectUserFind, deleteChat} = require("../controller/back");
const router = express.Router();
const {auth} = require('../middleware')

// /api/colla
router.post('/signup', signup);
router.post('/login', login);
router.get('/search/:search',search);
router.get('/searchuser/:id', searchUser);
// router.get('/searchchat/:chatId', searchUserchat_msg);
router.post('/createchat', createChat);
router.post('/createuc', createUserChat);
router.post('/createmsg', createMsg);
router.get('/connect', auth, connectUserFind);
router.delete('/deletechat', deleteChat)
// router.patch('/update', auth, update);
// router.delete('/delete', auth, deleteFunc);

module.exports = router;