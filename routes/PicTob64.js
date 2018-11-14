var express = require('express');
var router = express.Router();
var multer = require('multer');

router.post('/',function(req,res){
    res.render('PicTob64');
})

module.exports = router;