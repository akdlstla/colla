const express = require("express");
const { main, signup, chat, searchResult, noSearchResult } = require("../controller/page");
const router = express.Router();


router.get("/", main);
router.get('/signup',signup);
router.get("/chat", chat);
router.get('/result', searchResult);
router.get("/noresult", noSearchResult);

module.exports = router;