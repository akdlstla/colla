const express = require("express");
const {signup, login, search, searchUser, searchChat, createChat, createUserChat, createMsg} = require("../controller/back");
const router = express.Router();

// /api/colla
router.post('/signup', signup);
router.post('/login', login);
router.get('/search/:search',search);
router.get('/searchuser/:email', searchUser);
router.get('/searchchat/:chatName', searchChat);
router.post('/createchat', createChat);
router.post('/createuc', createUserChat);
router.post('/createmsg', createMsg);
// router.get('/info', auth, find);
// router.patch('/update', auth, update);
// router.delete('/delete', auth, deleteFunc);

module.exports = router;