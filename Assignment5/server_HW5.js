var express = require('express');
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var vt = require('./ViewTables');
var ts = require('./TranscriptSearch');

var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cs275',
    database: 'cs275_hw5'
});

con.connect(function(err) {
    if (err) {
        console.log("Error connecting to database: " + err);

    } else {
        console.log("Database successfully connected");
    }
})

// Endpoint for base page
app.get('/index.html', function (req,res) {
    console.log("Rendering index.html");
    res.sendFile('index.html');
    res.end();
});

// Endpoint for rendering viewtables page
app.get('/viewtables', function (req,res) {
    console.log("Rendering viewtables.html");
    var vtHTML = vt.render();
    res.write(vtHTML);
    res.end();
});

// Endpoint for rendering transcript search page
app.get('/transcriptsearch', function (req,res) {
    console.log("Rendering transcriptsearch.html");
    var tsHTML = ts.render();
    res.write(tsHTML);
    res.end();
});

//Endpoint for querying the STUDENT table
app.get('/viewtables/STUDENT', function (req,res) {
    console.log("Request to query STUDENT table");
    con.query('SELECT * from STUDENT',
        function(err,rows,fields) {
            if (err) {
                console.log("Error processing STUDENT table");
                res.end();
            } else {
                console.log("Query returns: ");
                res.write(vt.displaySTUDENT(rows));
                res.end();
            }
        });
});

//Endpoint for querying the COURSE table
app.get('/viewtables/COURSE', function (req,res) {
    console.log("Request to query COURSE table");
    con.query('SELECT * from COURSE',
        function(err,rows,fields) {
            if (err) {
                console.log("Error processing COURSE table");
                res.end();
            } else {
                console.log("Query returns: ", rows);
                res.write(vt.displayCOURSE(rows));
                res.end();
            }
        });
});

//Endpoint for querying the GRADES table
app.get('/viewtables/GRADES', function (req,res) {
    console.log("Request to query GRADES table");
    con.query('SELECT * from GRADES',
        function(err,rows,fields) {
            if (err) {
                console.log("Error processing GRADES table");
                res.end();
            } else {
                console.log("Query returns: ", rows);
                res.write(vt.displayGRADES(rows));
                res.end();
            }
        });
});

//Endpoint for querying the transcript
app.get('/transcriptsearch/query', function (req,res) {
    var stu = req.query.student;
    var term = req.query.term;

    console.log("Request transcript for " + stu + " for term " + term);
    con.query(ts.constructQuery(stu,term),
        function(err,rows,fields) {
            if (err) {
                console.log("Error processing transcript query");
                res.end();
            } else {
                console.log("Query returns: ", rows);
                res.write(ts.displayTranscript(rows));
                res.end();
            }
        });
});


app.listen(8080,function(){
    console.log('Server Running...port 8080');
});
