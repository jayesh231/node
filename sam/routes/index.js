var express = require('express');
var router = express.Router();

var jsonfile = require('jsonfile');
var file = 'student.json';
var obj = {name: ''}


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('gotit!');
    jsonfile.readFile(file, function(err, obj) {
    console.dir(obj);
     });
    next();
});

router.post('/',function(req,res,next){
   res.json(req.body); 
    jsonfile.writeFileSync(file, obj);
    console.log(req.body);
    next();
});

module.exports = router;
