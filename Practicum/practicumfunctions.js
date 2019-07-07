// practicumfunctions.js

// Request Topics
function requestTopics(){
    URL = "http://localhost:8080/topics";
    $.ajax({
        type: "GET",
        url: URL,
        data: "",
        dataType: "JSON",
        success: function(msg) {
            link_topics = parseTopics(msg);
            document.getElementById('content').innerHTML = link_topics;
        },
        error: function(xhr,ajaxOptions,thrownError){
            $("#content").html("Error getting topics");
        }
    });
};

function parseTopics(json) {
    var topics_html = "";
    var json_length = Object.keys(json.topics).length;
    var main_url = "https://www.healthcare.gov";

    for (var i=0;i<json_length;i++){
      topics_html += "<a href='" + main_url + json.topics[i].url + "' target='_blank'>" + (json.topics[i].title) + "</a>";
      topics_html += "<br>";
    }
    return topics_html;
}
