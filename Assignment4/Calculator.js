// Calculator.js
'use strict'
var fs = require('fs');

exports.render = function() {
    return fs.readFileSync('./calculator.html','utf8');
}

exports.computeFactorial = function(seed) {
    var num = parseInt(seed);
    <!-- Checking for valid input first -->
    if (isNaN(num)){
        return "Invalid Input";
    }
    if (num < 0) {
        return -1;
    } else if (num == 0) {
        return 1;
    } else {
        return (num * exports.computeFactorial(num-1));
    }
}

exports.computeSummation = function(seed) {
    var num = parseInt(seed);
    <!-- Checking for valid input first -->
    if (isNaN(num)){
        return "Invalid Input";
    }
    if (num < 0) {
        return -1;
    } else if (num == 0) {
        return 0;
    } else {
        return (num + exports.computeSummation(num-1));
    }
}
