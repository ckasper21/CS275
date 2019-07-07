var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

function Factorial(num) {
    num = parseInt(num);
    <!-- Checking for valid input first -->
    if (isNaN(num)){
        return "Invalid Input";
    }
    if (num < 0) {
        return -1;
    } else if (num == 0) {
        return 1;
    } else {
        return (num * Factorial(num-1));
    }
}

function SummationSeries(num) {
    num = parseInt(num);
    <!-- Checking for valid input first -->
    if (isNaN(num)){
        return "Invalid Input";
    }
    if (num < 0) {
        return -1;
    } else if (num == 0) {
        return 0;
    } else {
        return (num + SummationSeries(num-1));
    }
}

app.get('/HW3.html', function (req,res) {
    res.sendFile('HW3.html');
    res.end();
});

app.get('/fact', function (req,res) {
    var val = req.query.seed;
    console.log("Got a GET request from client side for fact containing " + val);
    res.write("Factorial of " + val + " is: " + Factorial(val));
    res.end();
});

app.get('/sum', function (req,res) {
    var val = req.query.seed;
    console.log("Got a GET request from client side for sum containing " + val);
    res.write("Summation series of " + val + " is: " + SummationSeries(val));
    res.end();
});

app.listen(8080,function(){
    console.log('Server Running...');
});
