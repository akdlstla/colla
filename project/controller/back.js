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
            console.log('signup', result);
           
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const find = await user.findOne({ where: { email } });
        if (find) {
            const bcryppass = await bcrypt.compare(password, find.password);
            console.log(bcryppass);
            if (bcryppass) {
                //jwt토큰 발생
                /**
                 * expiresIn: 만료시간
                 * algorithm: 서명 알고리즘 지정
                 * issuer: 토큰발급자 지정
                 */
                const token = jwt.sign({ id: find.id, email: find.email }, process.env.LOGSECRET, { expiresIn: '24h' });
                console.log(process.env.LOGSECRET);
                const response = {
                    token,
                };
                res.json({ result: true, code: 100, response, message: '로그인 완료' });
            } else {
                res.json({ result: false, code: 1000, response: null, message: '비밀번호 틀렸네?.' });
            }
        } else {
            res.json({ result: false, code: 1001, response: null, message: '회원이 아닌데?.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: false, message: '서버오류' });
    }
};

module.exports = {signup,login}