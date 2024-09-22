import http from 'http'
import queryString from 'query-string'

import data from './data/data.js'


////////////////////////////////////////////////////
////////////////////////////////////////////////////
// BASE ROUTES

const requestListener = (req, res) => {
    const { url } = req

    const dataPath = /^\/data\/(\d+)$/

    if (url === '/') {
        requestListenerOnRoot(req, res)
    } else if (url === '/data') {
        requestListenerOnData(req, res)
    } else if (dataPath.test(url)) {
        const params = url.match(dataPath)[1]
        requestListenerOnDataWithId(req, res, params)
    } else {
        res.end('<h1>404 NOT FOUND!</h1>')
    }
}



////////////////////////////////////////////////////
////////////////////////////////////////////////////
// SOME REQUEST LISTENER FOR SPECIFIC URL PATH

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
            const stringResponse = `
                <h1>Send data to server!</h1>
                <p>Current data: ${data.length}</p>
                <form action="/data" method="post">
                    <input type="text" name="name" id="name-input" placeholder="Input name"> 
                    <br>
                    <input type="text" name="job" id="job-input" placeholder="Input job">
                    <br>
                    <button type="submit">Submit</button>
                </form>
            `
            res.end(stringResponse)
            break;
        case 'POST':
            let body = ''

            req.on('data', chunk => {
                body += chunk.toString()
            })

            req.on('end', () => {
                const formData = queryString.parse(body)
                data.push(formData)

                res.writeHead(200, {'Content-Type' : 'text/html'})
                const stringResponse = `
                    <h1>Data successfully submitted to server</h1>
                    <a href="/data">
                        <button type="submit" >Submit data again</button>
                    </a>
                `
                res.end(stringResponse)
            })
            break;
        default:
            break;
    }
}

function requestListenerOnDataWithId(req, res, params) {
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
// THE CORE CODE

const server = http.createServer(requestListener)

const host = 'localhost'
const port = 5000

server.listen(port, host, () => {
    console.log(`The server is running on http://${host}:${port}`)
})