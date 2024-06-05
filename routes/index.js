var fs = require('fs');
var express = require('express');
var router = express.Router();
const jest = require('jest');
const stdMocks = require('std-mocks');

router.post('/', function(req,res){

  fileName = './tests/t' + Math.floor(Math.random() * 100000000) + '.test.js';
  fs.writeFileSync(fileName, req.body.sourceCode + req.body.testSourceCode);

  stdMocks.use();
  jest.run([fileName]).then((result) => {
    stdMocks.restore();
    fs.unlink(fileName, (err) => {});
    std = stdMocks.flush().stderr;
    res.send({text: std.toString(), pass: !std.slice(-1)[0].includes('failed')});
    console.log("FFFFf");
  });

});

module.exports = router;
