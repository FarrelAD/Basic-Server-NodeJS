import http from 'http'
import requestListener from './src/routes/routes.js'


const server = http.createServer(requestListener)

const host = 'localhost'
const port = 5000

server.listen(port, host, () => {
    console.log(`The server is running on http://${host}:${port}`)
})