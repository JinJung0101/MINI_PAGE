/* express */
var express = require('express');
var app = express();

/* ejs */
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

/* bootstrap */
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.get('/', function (req, res) {
    res.render('index.ejs')
});

app.listen(3000, function() {
    console.log("3000포트로 노드서버 오픈")
});



