// Weather.js
'use strict'
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var request = require('request');

var keyfile = fs.readFileSync('./AerisWeather/idkey.txt','utf8');

class Weather extends EventEmitter {
    constructor() {
        super();
        this.id = keyfile.split('&')[0];
        this.key = keyfile.split('&')[1];
    }
    static render() {
        return fs.readFileSync('./weather.html','utf8');
    }

    getWeather(zip) {
        var URL = "https://api.aerisapi.com/forecasts/" + zip;
        URL = URL + "?&format=json&client_id=" + this.id + "&client_secret=" + this.key;

        var self = this;

        // Emitter
        request.get(URL, function(error, response, body) {
            self.emit('weatherReady',body);
        })
    }
}

exports.Weather = Weather;
