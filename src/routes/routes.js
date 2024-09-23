import requestListenerOnRoot from '../controller/root.js'
import { requestListenerOnUsers, requestListenerOnUsersWithId } from '../controller/users.js'

function requestListener(req, res) {
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

export default requestListener