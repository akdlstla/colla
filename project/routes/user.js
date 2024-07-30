const express = require('express');
const { signup, login } = require('../controller/user');
const router = express.Router();
// const { auth } = require('../middleware');

router.post('/signup', signup);
router.post('/login', login);
// router.get('/info', auth, find);
// router.patch('/update', auth, update);
// router.delete('/delete', auth, deleteFunc);

module.exports = router;
