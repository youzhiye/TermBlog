var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.'+file.originalname.split('.').slice(-1))
    }
})

var upload = multer({ storage: storage });

router.post('/', upload.single('file'), function (req, res, next) {
    var base64 = fs.readFileSync('./public/uploads/'+req.file.filename);
    var base64return = {'base64':base64.toString('base64')}
    res.send(base64return);
})

module.exports = router;