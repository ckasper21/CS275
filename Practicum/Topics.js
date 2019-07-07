// Topics.js
'use strict'

var EventEmitter = require('events').EventEmitter;
var request = require('request');

class Topics extends EventEmitter {
    constructor() {
        super();
    }

    getTopics(zip) {
        var URL = "https://www.healthcare.gov/api/topics.json"
        var self = this;
        
        // Emitter
        request.get(URL, function(error, response, body) {
            self.emit('topicsReady',body);
        })
    }
}

exports.Topics = Topics;
