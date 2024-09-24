import queryString from 'query-string'
import data from '../data/data.js'

function requestListenerOnUsers(req, res) {
    const { method } = req

    switch (method) {
        case 'GET':
            res.setHeader('Content-Type', 'text/html')
            const stringResponse = `
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

                // Add new data to data store
                data.push(formData)

                res.writeHead(200, { 'Content-Type': 'text/html' })
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
            res.writeHead(405, { 'Content-Type' : 'text/html' })
            res.end('<h1>Method not allowed. Supported method: [GET, POST]</h1>')
            break;
    }
}

function requestListenerOnUsersWithId(req, res, params) {
    const { method } = req
    let stringResponse = ''

    switch (method) {
        case 'GET':
            let dataResult = '<p><strong>Data not found</strong></p>'
            const newFormHtml = `
                <br><br>
                <div>
                    <h1>Update this user data!</h1>
                    <form id="form">
                        <input type="text" name="new-name" id="new-name-input" placeholder="New name"> 
                        <br>
                        <input type="text" name="new-job" id="new-job-input" placeholder="New job">
                        <br>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <script>
                    const newNameInput = document.getElementById('new-name-input')
                    const newJobInput = document.getElementById('new-job-input')
                    const form = document.getElementById('form')

                    form.addEventListener('submit', function(event) {
                        event.preventDefault()

                        fetch(\`http://localhost:5000/users/${params}\`, {
                            method: 'PUT', 
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: newNameInput.value,
                                job: newJobInput.value
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            alert('Data has been successfully updated.')
                            location.reload()
                        })
                        .catch(error => console.error('Error:', error))
                    })
                </script>
            `
            if (params >= 1 && params <= data.length) {
                dataResult = `
                    <ul>
                        <li>Name: ${data[params - 1].name}</li>
                        <li>Job: ${data[params - 1].job}</li>
                    </ul>
                    ${newFormHtml}
                `
            }
            stringResponse = `
                <h1>You get data from the server</h1>
                <p>ID: ${params}</p>
                <p>Data: </p>
                ${dataResult}
            `

            res.end(stringResponse)
            break;
        case 'PUT':
            let body = ''

            req.on('data', chunk => {
                body += chunk.toString()
            })
            
            req.on('end', () => {
                try {
                    const newData = JSON.parse(body)
                    // Update data
                    data[params - 1] = newData

                    res.writeHead(200, { 'Content-Type': 'application/json' })

                    res.end(JSON.stringify({
                        message: 'Resource updated successfully',
                        received: newData
                    }))
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'Invalid JSON format' }))
                }
            })
            break;
        default:
            res.writeHead(405, { 'Content-Type' : 'text/html' })
            res.end('<h1>Method not allowed. Supported method: [GET, PUT]</h1>')
            break;
    }
}

export { requestListenerOnUsers, requestListenerOnUsersWithId }