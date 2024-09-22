import http from 'http'
import queryString from 'query-string'

import data from './data/data.js'


////////////////////////////////////////////////////
////////////////////////////////////////////////////
// BASE ROUTES

const requestListener = (req, res) => {
    const { url } = req

    const usersPath = /^\/users\/(\d+)$/

    if (url === '/') {
        requestListenerOnRoot(req, res)
    } else if (url === '/users') {
        requestListenerOnUsers(req, res)
    } else if (usersPath.test(url)) {
        const params = url.match(usersPath)[1]
        requestListenerOnUsersWithId(req, res, params)
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

function requestListenerOnUsers(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            const stringResponse = `
                <h1>Send user data to server!</h1>
                <p>Current user: ${data.length}</p>
                <form action="/users" method="post">
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
                    <a href="/users">
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

function requestListenerOnUsersWithId(req, res, params) {
    const { method } = req

    switch (method) {
        case 'GET':
            let dataResult = '<p><strong>Data not found</strong></p>'
            if (params >= 1 && params <= data.length) {
                dataResult = `
                    <ul>
                        <li>Name: ${data[params - 1].name}</li>
                        <li>Job: ${data[params - 1].job}</li>
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