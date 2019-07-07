var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var calc = require('./Calculator');
var weatherModule = require('./Weather');
var weather = new weatherModule.Weather();

// Endpoint for base page
app.get('/index.html', function (req,res) {
    console.log("Rendering index.html");
    res.sendFile('index.html');
    res.end();
});

// Endpoint for rendering computer page
app.get('/computer', function (req,res) {
    console.log("Rendering computer.html");
    var calcHTML = calc.render();
    res.write(calcHTML);
    res.end();
});

// Endpoint for factorial calculation
app.get('/computer/fact', function (req,res) {
    var val = req.query.seed;
    console.log("Got a GET request from client side for fact containing " + val);
    res.write("Factorial of " + val + " is: " + calc.computeFactorial(val));
    res.end();
});

// Endpoint for summation series calculation
app.get('/computer/sum', function (req,res) {
    var val = req.query.seed;
    console.log("Got a GET request from client side for sum containing " + val);
    res.write("Summation Series of 1 to " + val + " is: " + calc.computeSummation(val));
    res.end();
});

// Endpoint for rendering weather page
app.get('/weather', function (req,res) {
    console.log("Rendering weather.html");
    var weatherHTML = weatherModule.Weather.render();
    res.write(weatherHTML);
    res.end();
});

// Endpoint for weather forecaster function
app.get('/weather/getWeather', function (req,res) {
    var zip = req.query.zip;
    console.log("Got a GET request for getWeather");
    weather.once('weatherReady', function(msg) {
        res.write(msg);
        res.end();
    });
    weather.getWeather(zip);
});

app.listen(8080,function(){
    console.log('Server Running...port 8080');
});
