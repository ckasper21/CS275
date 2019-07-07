var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var topicsModule = require('./Topics');
var topics = new topicsModule.Topics();

// Endpoint for base page
app.get('/index.html', function (req,res) {
    console.log("Rendering index.html");
    res.sendFile('index.html');
    res.end();
});

app.get('/topics', function (req,res) {
    console.log("Got a topics GET request");
    topics.once('topicsReady', function(msg) {
        res.write(msg);
        res.end();
    });
    topics.getTopics();

});

app.listen(8080,function(){
    console.log('Server Running...port 8080');
});
