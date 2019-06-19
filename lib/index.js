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

        result.statusCode = response.statusCode
        result.reqErr = false
        result.url = url
        result.user = user
        result.userPath = config.path
        this.emit("request emitted", result)

    }).on("error", (err) => { // an error occurs into the silence!
        
        result.statusCode = err.code
        result.reqErr = true
        result.url = url
        result.user = user
        result.userPath = config.path
        this.emit("request emitted", result)

    }).end()
}

module.exports = Request