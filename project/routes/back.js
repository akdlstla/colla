const express = require("express");
const {signup, login, search} = require("../controller/back");
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/search/:search',search)
// router.get('/info', auth, find);
// router.patch('/update', auth, update);
// router.delete('/delete', auth, deleteFunc);

module.exports = router;