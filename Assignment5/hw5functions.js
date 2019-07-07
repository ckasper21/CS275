// hw5functions.js

// Populate home page content
function loadHome() {
    var homeContent = "<div><center> <img src='https://www.appliedbehavioranalysisprograms.com/wp-content/uploads/2018/02/drexel-online-aba-1024x271.png' style='width:612px;height:136px;'>"
    homeContent += "<h2> CS 275 HW #5 </h2>"
    homeContent += "<p> This website contains a student and course information!</p>"
    homeContent += "<p> You can even view student transcript for a specific term!</p>"
    homeContent += "<p> To utilize these tools, click on the menu in the upper left corner! </p></center></div>"

    $("#content").html(homeContent);
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("content").style.marginLeft = "0";
}

// Request rendering of viewtables HTML page
function requestViewTables(){
    URL = "http://localhost:8080/viewtables";
    $.ajax({
        type: "GET",
        url: URL,
        data: "",
        dataType: "html",
        success: function(msg) {
            document.getElementById('content').innerHTML = msg;
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#content").html("Error loading viewtables page");
        }
    });
};

// Request rendering of transcript search HTML page
function requestTranSearch(){
    URL = "http://localhost:8080/transcriptsearch";
    $.ajax({
        type: "GET",
        url: URL,
        data: "",
        dataType: "html",
        success: function(msg) {
            document.getElementById('content').innerHTML = msg;
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#content").html("Error loading transcript search page");
        }
    });
};

// Construct URL for DB query, call request
function queryDB() {
    // Get user table selection
    var sel = $("#sel").val();

    URL = "http://localhost:8080";

    if (sel == 'student') {
        URL += '/viewtables/STUDENT';
    } else if (sel == 'course') {
        URL += '/viewtables/COURSE';
    } else {
        URL += '/viewtables/GRADES';
    }

    $(document).ready(requestTable(URL));
}

// Request table query from server
function requestTable(URL){
    $.ajax({
        type: "GET",
        url: URL,
        data: "",
        dataType: "html",
        success: function(msg) {
            document.getElementById('queryOutput').innerHTML = msg;
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#queryOutput").html("Error fetching " + URL);
        }
    });
}

// Construct URL for DB query, call request
function queryTS() {
    // Get user table selection
    var stu = $("#student").val();
    var term = $("#term").val();

    URL = "http://localhost:8080/transcriptsearch/query";
    params = {
        "student": stu,
        "term": term
    }

    $(document).ready(requestTS(URL,params));
}

// Request table query from server
function requestTS(URL,params){
    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        dataType: "html",
        success: function(msg) {
            document.getElementById('queryOutput').innerHTML = msg;
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#queryOutput").html("Error fetching " + URL);
        }
    });
}
