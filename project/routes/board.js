const express = require("express");
const {writeFunc, noticeall, one, updateBordConfirm, deleteBordConfirm} = require("../controller/board");
const router = express.Router();
const {auth} = require('../middleware');

router.post('/writeFunc',auth,writeFunc)
router.post('/noticeall',noticeall)
router.get('/editnotice/:id',one)
router.patch('/updatebord', updateBordConfirm);
router.delete('/deletebord', deleteBordConfirm);

module.exports = router;