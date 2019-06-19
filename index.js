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