// hw4functions.js

// Populate home page content
function loadHome() {
    var homeContent = "<div><h2> CS 275 HW #4 </h2><p> This website contains a calculator and weather forecaster!</p>"
    homeContent += "<p> The calculator can compute the n-th Factorial and the Summation Series (from 1 to n)</p>"
    homeContent += "<p> The weather forecaster will provide a 7-day forecast for any zip code</p>"
    homeContent += "<p> To utilize these tools, click on the menu in the upper left corner </p></div>"

    $("#content").html(homeContent);
}

// Request rendering of Computer HTML page
function requestComputer(){
    URL = "http://localhost:8080/computer";
    $.ajax({
        type: "GET",
        url: URL,
        data: "",
        dataType: "html",
        success: function(msg) {
            document.getElementById('content').innerHTML = msg;
            $("#content").enhanceWithin();
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#content").html("Error loading calculator page");
        }
    });
};

// Calculate Factorial or Summation Series
function Calculate() {
    // Get user calculation selection
    var sel = $("#sel").val();
    var val = $("#seed").val();

    // Check for input -->
    if (val == "" || isNaN(parseInt(val))){
        document.getElementById('calcOutput').innerHTML = "Please enter a numeric value for n";
        return;
    }

    URL = "http://localhost:8080";

    if (sel == 'fact') {
        URL += '/computer/fact';
    } else {
        URL += '/computer/sum';
    }

    $(document).ready(requestCalc(URL));
}

// Request calculation from server
function requestCalc(URL){
    var val = $("#seed").val();
    params = {
        "seed": val
    };
    $.ajax({
        type: "GET",
        url: URL,
        data: params,
        dataType: "html",
        success: function(msg) {
            document.getElementById('calcOutput').innerHTML = msg;
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#calcOutput").html("Error fetching " + URL);
        }
    });
}

//----------------

// Request rendering of weather HTML page
function requestWeather(){
    URL = "http://localhost:8080/weather";
    $.ajax({
        type: "GET",
        url: URL,
        data: "",
        dataType: "html",
        success: function(msg) {
            document.getElementById('content').innerHTML = msg;
            $("#content").enhanceWithin();
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#content").html("Error loading weather page");
        }
    });
};

// Forecast weather
function Forecast() {
    var zip = $("#zipCode").val();

    // Check for valid input
    if (zip == "" || isNaN(parseInt(zip)) || zip.length != 5){
        document.getElementById('forecastOutput').innerHTML = "Please enter a valid zip code";
        return;
    }

    URL = "/weather/getWeather";
    $(document).ready(requestWeatherForecast(URL,zip));
};

// Display forecast data in table
function displayForecast(json){
    var table = '<table>';
    // For JQuery mobile
    table += '<table data-role="table" class="ui-responsive">'
    // Header for table
    table += '<thead> <tr> <th> Day </th> <th> Max Temp (F) </th> <th> Min Temp (F) </th> <th>Average Feels Like (F)</th> <th> Weather </th> </tr> </thead> <tbody>'
    for (var i = 0; i < 7; i++) {
        // Body for table
        table += '<tr>';
        table += '<td>';
        table += json.response[0].periods[i].validTime.split("T")[0];
        table += '</td>';
        table += '<td>';
        table += json.response[0].periods[i].maxTempF;
        table += '</td>';
        table += '<td>';
        table += json.response[0].periods[i].minTempF;
        table += '</td>';
        table += '<td>';
        table += json.response[0].periods[i].avgFeelslikeF;
        table += '</td>';
        table += '<td>';
        table += '<img src=https://cdn.aerisapi.com/wxicons/v2/'+ json.response[0].periods[i].icon +'>'
        table += '</td>';
        table += '</tr>';
    }
    table += '</tbody></table>';
    document.getElementById('forecastOutput').innerHTML = table;
};

// Request weather forecast data
function requestWeatherForecast(URL,zip){
    params = {
        "zip": zip
    };
    $.ajax({
        type: "GET",
        url: URL,
        contentType: "application/json; charset=utf-8",
        data: params,
        dataType: "json",
        success: function(msg) {
            var json = msg;
            displayForecast(json);
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#forecastOutput").html("Error fetching " + URL);
        }
    });
}
