const express = require("express");
const { main, signup, terms, personal, notice} = require("../controller/page");
const router = express.Router();

/*** 로그인 페이지 루트페이지로 추가하기 */
/**첫페이지 로그인, 회원가입 후 로그인페이지로 연결 */
router.get('/signup',signup);
router.get("/main", main);
//약관동의, 개인정보처리방침
router.get('/terms',terms)
router.get('/personal',personal)
router.get('/notice',notice)

module.exports = router;