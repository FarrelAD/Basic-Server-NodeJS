import data from '../data/data.js'

function requestListenerOnRoot(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            res.setHeader('Content-Type', 'text/html')
            const stringResponse = `
                <h1>Welcome! You have successfully accessed the website!</h1>
                <p>Current position: root</p>
                <br><br>
                <div>
                    <h1>Send user data to server!</h1>
                    <p>Current user: ${data.length}</p>
                    <form action="/users" method="post">
                        <input type="text" name="name" id="name-input" placeholder="Input name"> 
                        <br>
                        <input type="text" name="job" id="job-input" placeholder="Input job">
                        <br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <h1>Search something!</h1>
                <form action="/search" method="get">
                    <input type="text" name="name" id="search-box-name" placeholder="Name">
                    <br>
                    <input type="text" name="job" id="search-box-job" placeholder="Job">
                    <br>
                    <button type="submit">Search</button>
                </form>
                <p><i>*) Empty search box will get all user data</i></p>
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