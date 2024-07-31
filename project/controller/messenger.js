const {user, chat, msg, comment} = require('../models');

//채팅방 전체 검색
const allChat = async (req, res) => {
    // console.log(req.params.id);
    // //select * from post where id = 'req.params.id' and title = '안녕하세요'
    // //const result = await Post.findOne({ where: { id: req.params.id, title: '안녕하세요' } });
    // const result = await Post.findOne({ where: { id: req.params.id } });
    // console.log('one', result);
    // res.json({ result: true, data: result });
};

//채팅방 하나 검색. 채팅방 클릭
const oneChat = async (req, res) => {
    // console.log(req.params.id);
    // //select * from post where id = 'req.params.id' and title = '안녕하세요'
    // //const result = await Post.findOne({ where: { id: req.params.id, title: '안녕하세요' } });
    // const result = await Post.findOne({ where: { id: req.params.id } });
    // console.log('one', result);
    // res.json({ result: true, data: result });
};

//전체 검색
//user 에서 검색. username:? or department:?
const findFromUser = async (req, res) => {
    const result = await Post.findAll({
        //attributes: 원하는 컬럼 조회
        attributes: ['id', 'title', 'content', 'createdAt'],
        //Op.lte(이하), Op.gte(이상), Op.gt(초과), Op.lt(미만)
        //Op.or(또는), Op.ne(같지않음), Op.in(배열요소중 하나), Op.notIn(배열요소와 모두다름)
        //where: { id: { [Op.gte]: 3 } },
        //where: { [Op.or]: [{ id: 5 }, { title: '안녕하세요' }] },
        order: [['id', 'desc']],
        // limit: 2,
        // offset: 1,
    }); 
    
    console.log('all', result);
    res.json({ result: true, data: result });
};
//chats, msgs 에서 검색. 조인
const findFromChats = async (req, res) => {
    // const result = await Post.findAll({
    // }); 
    // res.json({}); 
};

//채팅방(chat) 채팅내용(msg) 아카이빙
const msgAll = async (req, res) => {
    // const result = await Post.findAll({
    //     //attributes: 원하는 컬럼 조회
    //     attributes: ['id', 'title', 'content', 'createdAt'],
    //     //Op.lte(이하), Op.gte(이상), Op.gt(초과), Op.lt(미만)
    //     //Op.or(또는), Op.ne(같지않음), Op.in(배열요소중 하나), Op.notIn(배열요소와 모두다름)
    //     //where: { id: { [Op.gte]: 3 } },
    //     //where: { [Op.or]: [{ id: 5 }, { title: '안녕하세요' }] },
    //     order: [['id', 'desc']],
    //     // limit: 2,
    //     // offset: 1,
    // });
    // console.log('all', result);
    // res.json({ result: true, data: result });
};

//채팅내용(msg) 하나 생성
const writeMsg = async (req, res) => {
    // //req.body.title, req.body.content
    // const { title, content } = req.body;
    // //mysql:insert into posts (title, content) values (title, content)
    // const result = await Post.create({ title, content });
    // console.log('write', result);
    // res.json({ result: true, data: result.id });
}; 

//채팅내용(msg) 수정
const updateMsgFunc = async (req, res) => {
    // const { id, username, pw } = req.body;
    // await Member.update({ username, pw }, { where: { id } });
    // res.json({ result: true });
};

//채팅내용(msg) 삭제
const deleteMsgFunc = async (req, res) => {
    // const { id } = req.body;
    // await Member.destroy({ where: { id } });
    // res.json({ result: true });
}; 

//댓글(comment) 하나 생성
const writeComment = async (req, res) => {
    // const { title, content } = req.body;
    // //mysql:insert into posts (title, content) values (title, content)
    // const result = await Post.create({ title, content });
    // console.log('write', result);
    // res.json({ result: true, data: result.id });
};

//댓글(comment) 수정
const updateCFunc = async (req, res) => {
    // const { id, username, pw } = req.body;
    // await Member.update({ username, pw }, { where: { id } });
    // res.json({ result: true });
};

//댓글(comment) 삭제
const deleteCFunc = async (req, res) => { 
    // const { id } = req.body;
    // await Member.destroy({ where: { id } });
    // res.json({ result: true });
};

module.exports = { allChat, oneChat, findFromUser, findFromChats, msgAll, writeMsg, writeComment, updateMsgFunc, deleteMsgFunc, updateCFunc, deleteCFunc };