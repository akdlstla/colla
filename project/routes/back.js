const express = require("express");


const {index, signup, login, search, searchUser,  createChat, createUserChat, createMsg, connectUserFind, deleteChat} = require("../controller/back");


const router = express.Router();
const {auth} = require('../middleware');

// /api/colla
router.post('/', index);
router.post('/signup', signup);
router.post('/login', login);
router.get('/search/:search',search);
router.post('/createchat', createChat);
router.get('/connect', auth, connectUserFind);


// router.patch('/update', auth, update);
// router.delete('/delete', auth, deleteFunc);

module.exports = router;