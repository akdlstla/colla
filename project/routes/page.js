const express = require("express");
const { main,signup } = require("../controller/page");
const router = express.Router();


router.get("/", main);
router.get('/signup',signup)


module.exports = router;