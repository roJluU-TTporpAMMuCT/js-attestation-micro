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
    res.send(stdMocks.flush().stderr);
  });

});

module.exports = router;
