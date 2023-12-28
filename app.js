var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('index.ejs', {'data' : 1234})
});

app.listen(3000, function() {
    console.log("3000포트로 노드서버 오픈");
});



