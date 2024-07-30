const express = require("express");
const { main, signup, chat, searchResult, noSearchResult, terms, personal } = require("../controller/page");
const router = express.Router();


router.get("/main", main);
router.get('/signup',signup)
router.get('/terms',terms)
router.get('/personal',personal)
router.get("/chat", chat);
router.get('/result', searchResult);
router.get("/noresult", noSearchResult);

module.exports = router;