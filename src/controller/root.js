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
            res.writeHead(405, { 'Content-Type' : 'text/html' })
            res.end('<h1>Method not allowed. Supported method: [GET]</h1>')
            break;
    }
}

export default requestListenerOnRoot