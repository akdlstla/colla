const { user, msg, chat, userchat , bord} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, where } = require('sequelize');
const { index } = require('./page');



const writeFunc = async(req,res) =>{
    console.log('라이트 리퀘스트 바디',req.body);
    try {
        // const {id} = req.userInfo
        console.log('req.userInfo',req.userInfo);
        const {id} = req.userInfo
        const {type, title, contents} =req.body
        console.log(req.body);
        
        const result = await bord.create({type, title,contents, userId:id})
        console.log('라이트리절트', result);
        res.json({result:true, message:'작성완료!'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
    
}
const noticeall = async(req,res) =>{
    console.log(req.body,'바디가 뭔뎅');
    const data = req.body.data

    const contents = await bord.findAll({
        include: [
            {
                model: user,
                attributes: ['username'],
            },
        ], where: { type: data }
    })
    console.log('노티스올 리절트',contents);
    res.json({result: true, contents })
}

const one = async(req,res)=>{
    console.log(req.params.id)
    const result = await bord.findOne({where:{id:req.params.id}})
    console.log('one', result)
    res.json({result:true,data:result})
}
// 게시판(공지사항) 수정 완료
const updateBordConfirm = async (req, res) => {
    try {
        const { pathname, title, contents } = req.body;
        console.log('요청내용 블라블라', pathname, title, contents);
        const find = await bord.findOne({ where: { id: pathname } });
        if (find) {
            await bord.update({ title, contents }, { where: { id: pathname} });
            res.json({ result: true, message: '수정했다치고' });
        } else {
            res.json({ result: false, message: '아니아니 아니됨' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '게시판 글 수정완료 기능 서버오류' });
    }
};
// 게시판(공지사항) 삭제 완료
const deleteBordConfirm = async (req, res) => {
    try {
        const { pathname } = req.body;
        console.log('삭제할 글 id값', pathname);
        await bord.destroy({ where: { id: pathname } });
        res.json({ result: true, message: '삭제됐다치고' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '게시판 글 삭제완료 기능 서버오류' });
    }
};


module.exports = {writeFunc, noticeall, one, updateBordConfirm, deleteBordConfirm}