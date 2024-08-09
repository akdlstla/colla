const { user, msg, chat, userchat } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op, where } = require('sequelize');

const salt = Number(process.env.SECRET);

//회원가입
const signup = async (req, res) => {
    try {
        const { username, email, password, department } = req.body;
        const find = await user.findOne({ where: { email } });
        console.log('find', find);

        if (find) {
            res.json({ result: false, message: '이미 가입한 회원임' });

        } else {

            const bcryppass = await bcrypt.hash(password, salt);
            const result = await user.create({ username, email, password: bcryppass, department });
            console.log('signup', result);

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
};
const login = async (req, res) => {
    // if (!email || !password) {
    //     return res.status(400).json({ message: '이메일과 비밀번호를 입력하세요.' });
    // };

    try {
        const { email, password, keepEmail, keepLogin } = req.body;
        console.log('login 값 :', email, password, keepEmail, keepLogin);

        // 사용자 확인
        // const findAll = await user.findAll()
        // console.log(findAll)

        const find = await user.findOne({ where: { email } });
        console.log('find 값 :', find);
        if (find) {
            const bcryppass = await bcrypt.compare(password, find.password);
            console.log('bcryppass 값 : ', bcryppass);
            if (bcryppass) {
                //jwt토큰 발생
                /**
                 * expiresIn: 만료시간
                 * algorithm: 서명 알고리즘 지정
                 * issuer: 토큰발급자 지정
                 */
                const token = jwt.sign({ id: find.id, email: find.email }, process.env.LOGSECRET, { expiresIn: '24h' });
                console.log('토큰값 :', token);
                console.log('환경변수LOGSECRET값:', process.env.LOGSECRET);
                const response = {
                    token,
                };
                res.json({ result: true, response, message: '로그인 완료' });


                // 쿠키

                // const expiryDate = new Date();
                // expiryDate.setDate(expiryDate.getDate() + 7);
                // res.cookie('email', response , { expires: expiryDate, httpOnly: true});
                // console.log('쿠키생성까지 읽은건데');

                // const email = req.cookies.response;
                // res.render('login', { email: response });


            } else {
                res.json({ result: false, message: '비밀번호 틀렸네?.' });
            }
        } else {
            res.json({ result: false, message: '회원이 아닌데?.' });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
};
const search = async (req, res) => {
    try {
        // console.log(req.params);
        const { search } = req.params
        // console.log('서치워드', search);
        const data = await user.findAll({ where: { username: { [Op.like]: `%${search}%` } } })
        const msgResult = await msg.findAll({
            include: [
                {
                    model: user,
                    attributes: ['username', 'department'],
                },
            ], where: { talk: { [Op.like]: `%${search}%` } }
        });
        //console.log('데이터', data, '메세지', msgResult);

        res.json({ result: true, userData: data, msgData: msgResult })
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}

//사용자 한명 찾기 : 사용자 이메일로. get
const searchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await user.findOne({ where: { id } });
        res.json({ result: true, result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}
//chat 한개 찾기 : chat으로. get
// const searchUserchat_msg = async (req, res) => {
//     try {
//         //console.log(req.params);
//         const { chatId } = req.params;
//         //chatId로 채팅방 참여중인 userId를 찾는다.
//         //respose.userId
//         const userId = [];
//         const userInfo = [];
//         const result = await userchat.findAll({where: { chatId }});
//         result.forEach(value => {
//             userId.push(value.userId);
//         });
//         let userTemp = await user.findOne({where : {id:userId[0]}, attributes:["id", "username"]});
//         user.push(userTemp);
//         userTemp = await user.findOne({where : {id:userId[1]}});
//         user.push(userTemp);

       

//         // const flag = 1
        
//         //msgs.
//         const msgs = await msg.findAll({where: { chatId }});

//         res.json({ result: true, response:result, msgs, userId, user });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ result: false, message: '서버오류' });
//     }
// }

//채팅방 목록 생성 : post
const createChat = async (req, res) => {
    try {
        console.log('req:', req.body);

        const { chatName, myId, yourId } = req.body;

        const arr1temp = []
        const arr2temp = []
        const arr1 = await userchat.findAll({ where: { userId: Number(myId) } })
        const arr2 = await userchat.findAll({ where: { userId: Number(yourId) } })

        arr1.forEach(value => {
            arr1temp.push(value.chatId)
        })
        arr2.forEach(value => {
            arr2temp.push(value.chatId)
        })
        const arr = arr1temp.filter(value => arr2temp.includes(value));
        console.log("result", arr)

        let result = ''
        let flag = 0
        if (arr.length === 0) {
            //새로운 방 생성
            result = await chat.create({ chat: chatName });
            flag = 0
        } else {
            //arr[0]
            result = await chat.findOne({
                where: { id: arr[0] },
                include: [{ model: msg, attributes: ["id", "userId", "talk"] }],
            })
            flag = 1
        }
        res.json({ result: true, flag, response: result });

    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}

//사용자_채팅방목록 생성 : post
const createUserChat = async (req, res) => {
    try {
        console.log("createUserChat", req.body)
        const { userId, chatId } = req.body;
        const result = await userchat.create({ userId, chatId });
        console.log('result: ', result);
        res.json({ result: true, result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}

//채팅내용 생성 : post
const createMsg = async (req, res) => {
    try {
        const { userId, chatId, talk } = req.body;
        const result = await msg.create({ userId, chatId, talk });
        // console.log('result: ', result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
}
const connectUserFind = async (req, res) => {
    try {
        console.log("userInfo", req.userInfo)
        const { id } = req.userInfo;
        const result = await user.findByPk(id, {
            attributes: ['username', 'id'],
        });
        const exists = await userchat.findAll({ where: { userId: id } })
        const rooms = []
        for (let i = 0; i < exists.length; i++) {
            const find = await chat.findOne({
                where: { id: exists[i].chatId },
                include: [{model: userchat, where: {userId: {[Op.ne]: id}}}]
            })
            rooms.push(find)
        }

        const data = []
        for(let i = 0; i < rooms.length; i++) {
            const your = await user.findByPk( rooms[i].userchats[0].userId )
            const obj = {
                chat: rooms[i].chat,
                id: rooms[i].id,
                yourId: rooms[i].userchats[0].userId,
                your:your.username
            }
            data.push(obj)
        }

        res.json({ result: true, response: result, rooms:data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
};
const deleteChat = async(req,res) =>{
    try {
        console.log('id확인',req.body.id);
        
        const result = await msg.destroy({where:{id:req.body.id}})
        
    } catch (error) {
        res.status(500).json({result: false, message:'메세지를 삭제할 수 없습니다'})
    }
}
module.exports = { signup, login, search, searchUser, createChat, createUserChat, createMsg, connectUserFind, deleteChat }