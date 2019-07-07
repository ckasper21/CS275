// TranscriptSearch.js
'use strict'
var fs = require('fs');

exports.render = function() {
    return fs.readFileSync('./transcriptsearch.html','utf8');
}

exports.constructQuery = function(student, term) {
    var cmd = "";
    cmd += "select STUDENT.studentid, STUDENT.fn, STUDENT.ln , GRADES.term, COURSE.courseid, COURSE.des, GRADES.grade ";
    cmd += "from STUDENT join GRADES on STUDENT.studentid = GRADES.studentid join COURSE ON GRADES.courseid = COURSE.courseid "
    cmd += "where STUDENT.studentid = '" + student + "' and GRADES.term = '" + term + "';"

    return cmd;
}

exports.displayTranscript = function(json) {
    console.log("In display transcript!");
    var json_length = Object.keys(json).length;

    var table = '<table>';
    // For JQuery mobile
    table += '<table data-role="table">'
    // Header for table
    table += '<thead> <tr> <th> StudentID </th> <th> First Name </th> <th> Last Name </th>'
    table += '<th> Term </th> <th> CourseID </th> <th> Description </th> <th> Grade </th> </tr> </thead> <tbody>'

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
        table += json[i].term;
        table += '</td>';
        table += '<td>';
        table += json[i].courseid;
        table += '</td>';
        table += '<td>';
        table += json[i].des;
        table += '</td>';
        table += '<td>';
        table += json[i].grade;
        table += '</td>';
        table += '</tr>';
    }
    table += '</tbody></table>';
    return table;
}
