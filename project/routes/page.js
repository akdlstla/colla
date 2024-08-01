const express = require("express");
const { main, signup, chat, searchResult, noSearchResult, terms, personal, login } = require("../controller/page");
const router = express.Router();


router.get("/", main);
router.get('/signup',signup)
router.get('/terms',terms)
router.get('/personal',personal)
router.get("/chat", chat);
router.get('/result', searchResult);
router.get("/noresult", noSearchResult);
router.get('/login', login)

module.exports = router;