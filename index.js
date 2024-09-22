const http = require('http')
const url = require('url')

const data = require('./data/data')

const requestListener = (req, res) => {
    const { url } = req

    const dataPath = /^\/data\/(\d+)$/

    if (url === '/') {
        requestListenerOnRoot(req, res)
    } else if (dataPath.test(url)) {
        const params = url.match(dataPath)[1]
        requestListenerOnData(req, res, params)
    } else {
        res.end('<h1>404 NOT FOUND!</h1>')
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

function requestListenerOnData(req, res, params) {
    const { method } = req

    switch (method) {
        case 'GET':
            let dataResult = '<p><strong>Data not found</strong></p>'
            if (params >= 1 && params <= data.length) {
                dataResult = `
                    <ul>
                        <li>Nama: ${data[params - 1].name}</li>
                        <li>Pekerjaan: ${data[params - 1].job}</li>
                    </ul>
                `
            }
            const stringResponse = `
                <h1>You get data from the server</h1>
                <p>ID: ${params}</p>
                <p>Data: </p>
                ${dataResult}
            `
            
            res.end(stringResponse)
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