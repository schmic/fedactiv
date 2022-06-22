import { koaJwtSecret } from 'jwks-rsa'
import Koa from 'koa'
import cookie from 'koa-cookie'
import jwt from 'koa-jwt'

import { routes as apiRoutes } from './routes/api'
import { routes as usersRoutes } from './routes/users'

const app = new Koa({ proxy: true })

app.use(cookie())
app.use(jwt({
    cookie: 'atkn',
    debug: true,
    passthrough: true,
    secret:
        koaJwtSecret({
            jwksUri: 'http://auth:8080/auth/realms/fedactiv/protocol/openid-connect/certs',
            cache: true,
            cacheMaxEntries: 5,
            cacheMaxAge: 2 * 60 * 60 * 100
        })
}))

app.use(apiRoutes)
app.use(usersRoutes)

app.listen(3000, () => {
    console.log('Running on port 3000 ...')
})