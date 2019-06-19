'use strict'
const https = require('https')
var util = require("util")
var EventEmitter = require("events")
util.inherits(Request, EventEmitter)

function Request() {
    EventEmitter.call(this)
}

const result = {
    statusCode: undefined,
    reqErr: undefined,
    url: undefined,
    user: undefined,
    userPath: undefined
}
/**
 * Do an https GET request then emit an event called "request emitted"
 * @param  {String} url
 * @param  {String} user
 * @return {Object} The object that contains the request results
 */
Request.prototype.GET = function(url,user){

    const path = `${url}${user}`
    https.get(path, (response) => {

        result.statusCode = response.statusCode
        result.reqErr = false
        result.url = url
        result.user = user
        result.userPath = path
        this.emit("request emitted", result)

    }).on("error", (err) => { // an error occurs into the silence!
        
        result.statusCode = err.code
        result.reqErr = true
        result.url = url
        result.user = user
        result.userPath = path
        this.emit("request emitted", result)

    }).end()
}

module.exports = Request