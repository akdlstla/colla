const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            const result = await user.create({ username, email, password:bcryppass, department });
            console.log('signup 결과값:', result);
            res.json({ result: true, message: '가입 완료' });
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
        const { email, password, rememberMe } = req.body;
        console.log( 'login 값 :', email, password , rememberMe);

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

module.exports = {signup,login}