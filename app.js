var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('MUV Main Page');
});

app.listen(3000, function() {
    console.log("3000포트로 노드서버 오픈");
});

