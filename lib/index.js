'use strict'
const https = require('https')
var util = require("util")
var EventEmitter = require("events")
util.inherits(Request, EventEmitter)

function Request() {
    EventEmitter.call(this)
}

/**
 * https GET request method that emit an event called "request emitted"
 * @param  {String} url
 * @param  {String} user
 * @return {Object} The self emitted object that contains the requests results
 * @author Drozerah https://github.com/Drozerah/node_events_emitter_https_lib
 */
Request.prototype.GET = function(url,user){

    // declare result Object
    const result = {
        statusCode: undefined,
        reqErr: undefined,
        url: undefined,
        user: undefined,
        userPath: undefined
    }
    // declare config Object
    const config = {
        path: `${url}${user}`
    }
    https.get(config.path, (response) => {

        // update result Oject
        result.statusCode = response.statusCode
        result.reqErr = false
        result.url = url
        result.user = user
        result.userPath = config.path
        // self emit the "request emitted" event
        this.emit("request emitted", result)

    }).on("error", (err) => { // an error occurs into the silence!
        
        // update result Oject
        result.statusCode = err.code
        result.reqErr = true
        result.url = url
        result.user = user
        result.userPath = config.path
        // self emit the "request emitted" event
        this.emit("request emitted", result)

    }).end()
}

module.exports = Request