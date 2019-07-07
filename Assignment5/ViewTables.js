// ViewTables.js
'use strict'
var fs = require('fs');

exports.render = function() {
    return fs.readFileSync('./ViewTables.html','utf8');
}

exports.displaySTUDENT = function(json) {
    console.log("In display student!");


    var table = '<table>';
    // For JQuery mobile
    table += '<table data-role="table">'
    // Header for table
    table += '<thead> <tr> <th> StudentID </th> <th> First Name </th> <th> Last Name </th>'
    table += '<th> Date of Birth </th> <th> Major </th> </tr> </thead> <tbody>'

    for (var i = 0; i < json_length; i++) {
        // Body for table
        table += '<tr>';
        table += '<td>';
        table += json[i].studentid;
        table += '</td>';
        table += '<td>';
        table += json[i].fn;
        table += '</td>';
        table += '<td>';
        table += json[i].ln;
        table += '</td>';
        table += '<td>';
        table += JSON.stringify(json[i].dob).split("T")[0].replace('"','');
        table += '</td>';
        table += '<td>';
        table += json[i].major
        table += '</td>';
        table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
}

exports.displayCOURSE = function(json) {
    console.log("In display course!");
    var json_length = Object.keys(json).length;

    var table = '<table>';
    // For JQuery mobile
    table += '<table data-role="table">'
    // Header for table
    table += '<thead> <tr> <th> CourseID </th> <th> Description </th> </tr> </thead> <tbody>'

    for (var i = 0; i < json_length; i++) {
        // Body for table
        table += '<tr>';
        table += '<td>';
        table += json[i].courseid;
        table += '</td>';
        table += '<td>';
        table += json[i].des
        table += '</td>';
        table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
}

exports.displayGRADES = function(json) {
    console.log("In display grades!");
    var json_length = Object.keys(json).length;

    var table = '<table>';
    // For JQuery mobile
    table += '<table data-role="table">'
    // Header for table
    table += '<thead> <tr> <th> CourseID </th> <th> StudentID </th> <th> Term </th>'
    table += '<th> Grade </th> </thead> <tbody>'

    for (var i = 0; i < json_length; i++) {
        // Body for table
        table += '<tr>';
        table += '<td>';
        table += json[i].courseid;
        table += '</td>';
        table += '<td>';
        table += json[i].studentid;
        table += '</td>';
        table += '<td>';
        table += json[i].term;
        table += '</td>';
        table += '<td>';
        table += json[i].grade;
        table += '</td>';
        table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
}
