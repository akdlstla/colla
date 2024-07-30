const express = require('express');
const { oneChat, findFromUser, findFromChats, msgAll, writeMsg, 
    writeComment, updateMsgFunc, deleteMsgFunc, updateCFunc, deleteCFunc } = require('../controller/messenger');
const router = express.Router();

//채팅방 하나 검색.
router.get('/onechat', oneChat);
//user 에서 검색. username:? or department:?
router.get('/findFromUser', findFromUser);
//chats, msgs 에서 검색
router.get('/findFromChats', findFromChats);
//채팅방(chat) 채팅내용(msg) 아카이빙
router.get('/msgAll', msgAll);
//채팅내용(msg) 하나 생성
router.post('/writeMsg', writeMsg);
//채팅내용(msg) 하나 수정
router.patch('/writeComment', writeComment);
//채팅내용(msg) 하나 삭제
router.delete('/updateMsgFunc', updateMsgFunc);
//댓글(comment) 하나 생성
router.post('/deletemsg', deleteMsgFunc);
//댓글(comment) 하나 수정
router.patch('/updaupdatecomment', updateCFunc);
//댓글(comment) 하나 삭제
router.delete('/deletecomment', deleteCFunc);

module.exports = router;