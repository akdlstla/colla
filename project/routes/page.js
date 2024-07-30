const express = require("express");
const { main,signup,terms,personal } = require("../controller/page");
const router = express.Router();


router.get("/", main);
router.get('/signup',signup)
router.get('/terms',terms)
router.get('/personal',personal)


module.exports = router;