import url from 'url'

import requestListenerOnRoot from '../controller/root.js'
import { requestListenerOnUsers, requestListenerOnUsersWithId } from '../controller/users.js'
import requestListenerOnSearch from '../controller/search.js'

function requestListener(req, res) {
    const parsedUrl = url.parse(req.url, true)

    const usersPath = /^\/users\/(\d+)$/

    if (parsedUrl.pathname === '/') {
        requestListenerOnRoot(req, res)
    } else if (parsedUrl.pathname === '/users') {
        requestListenerOnUsers(req, res)
    } else if (usersPath.test(parsedUrl.pathname)) {
        const params = parsedUrl.pathname.match(usersPath)[1]
        requestListenerOnUsersWithId(req, res, params)
    } else if (parsedUrl.pathname === '/search') {
        requestListenerOnSearch(req, res)
    } else {
        res.end('<h1>404 NOT FOUND!</h1>')
    }
}

export default requestListener