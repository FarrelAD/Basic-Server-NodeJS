const http = require('http')
const url = require('url')

const requestListener = (req, res) => {
    const { url } = req

    switch (url) {
        case '/':
            requestListenerOnRoot(req, res)
            break;
        case '/data':
            requestListenerOnData(req, res)
            break;
        case '/data/1':
            res.setHeader('Content-Type', 'text/html')
            res.end('Data 1')
            break;
        default:
            break;
    }
}

function requestListenerOnRoot(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            res.setHeader('Content-Type', 'text/html')
            const stringResponse = `
                <h1>Welcome! You have successfully accessed the website!</h1>
                <p>Current position: root</p>
            `
            res.end(stringResponse)
            break;
        default:
            break;
    }
}

function requestListenerOnData(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            res.end('You are in the data page')
            break;
        case 'POST':
            break;
        default:
            break;
    }
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

const server = http.createServer(requestListener)

const host = 'localhost'
const port = 5000

server.listen(port, host, () => {
    console.log(`The server is running on http://${host}:${port}`)
})