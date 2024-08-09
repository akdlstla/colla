const express = require("express");
const {index, signup, login, search, searchUser, searchChat, createChat, createUserChat, createMsg, connectUserFind, deleteChat, writeFunc, noticeall} = require("../controller/back");
const router = express.Router();
const {auth} = require('../middleware');

// /api/colla
router.post('/', index);
router.post('/signup', signup);
router.post('/login', login);
router.get('/search/:search',search);
router.get('/searchuser/:email', searchUser);
router.get('/searchchat/:chatName', searchChat);
router.post('/createchat', createChat);
router.post('/createuc', createUserChat);
router.post('/createmsg', createMsg);
router.get('/connect', auth, connectUserFind);
router.delete('/deletechat', deleteChat)
router.post('/writeFunc',auth,writeFunc)
router.post('/noticeall',noticeall)
// router.patch('/update', auth, update);
// router.delete('/delete', auth, deleteFunc);

module.exports = router;