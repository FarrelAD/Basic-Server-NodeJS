import url from 'url'
import data from '../data/data.js'

function requestListenerOnSearch(req, res) {
    const { method } = req
    const parsedUrl = url.parse(req.url, true)

    switch (method) {
        case 'GET':
            res.writeHead(200, { 'Content-Type': 'text/html' })

            let result = []

            if (parsedUrl.query.name != '' && parsedUrl.query.job != '') {
                result = data.filter(x => {
                    x.name.toLowerCase() == parsedUrl.query.name.toLowerCase() &&
                    x.job.toLowerCase() == parsedUrl.query.job.toLowerCase()
                })
            } else if (parsedUrl.query.name != '') {
                result = data.filter(x => x.name.toLowerCase() == parsedUrl.query.name.toLowerCase())
            } else if (parsedUrl.query.job != '') {
                result = data.filter(x => x.job.toLowerCase() == parsedUrl.query.job.toLowerCase())
            } else {
                result = data
            }

            let formattedResult = result
            if (result.length > 0) {
                formattedResult = `
                    <ol>
                `
                result.forEach(x => {
                    formattedResult += `
                        <li>
                            <p>Name : ${x.name}</p>
                            <p>Job : ${x.job}</p>
                        </li>
                    `
                })  
                formattedResult += `
                    </ol>
                `
            } else {
                formattedResult = '<h3>Data not found!</h3>'
            }

            const stringResponse = `
                <h1>Search result</h1>
                ${formattedResult}
            `
            res.end(stringResponse)
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/html' })
            res.end('<h1>Method not allowed. Supported method: [GET]</h1>')
            break;
    }
}

export default requestListenerOnSearch