const http = require('http')

const requestListener = (req, res) => {
    const { url } = req

    switch (url) {
        case '/':
            requestListenerOnRoot(req, res)
            break;
        case '/profile':
            requestListenerOnProfile(req, res)
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
            res.end('Welcome! You success the website!')
            break;
        case 'POST':
            break;
        default:
            break;
    }
}

function requestListenerOnProfile(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            
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