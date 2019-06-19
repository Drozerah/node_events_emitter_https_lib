# Node.js Event Based HTTPS GET Request Library 

> A library that defines a GET method to do HTTPS requests that emits a Node event

## Usage:

````javascript
const Request = require("./lib")
const request = new Request()

// Calling the .GET(url, user) method will launch the 'request emitted' event
request.GET('https://dev.to/', 'drozerah')

// The listener is listening the 'request emitted' event emitted by the .GET() method
let counter = 0
request.addListener("request emitted", (result) => {
    counter++
    result.reqId = counter
    console.log(result)
})
// return
// { statusCode: 200,
// reqErr: false,
// url: 'https://dev.to/',
// user: 'drozerah',
// userPath: 'https://dev.to/drozerah',
// reqId: 1 }

````

__Useful links:__

- [Node.js - inheriting from EventEmitter](https://stackoverflow.com/questions/8898399/node-js-inheriting-from-eventemitter) - stack overflow
- Node.js [events doc](https://nodejs.org/api/events.html#events_events)
- [Node.js EventEmitter](https://www.tutorialsteacher.com/nodejs/nodejs-eventemitter)

__Author:__

- Thomas G. aka Drozerah - [GitHub](https://github.com/Drozerah)

__License:__

- [ISC](licence) © Thomas G. aka Drozerah