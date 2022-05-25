import Koa from 'koa'
import { routes as usersRoutes } from './routes/users'
const app = new Koa({ proxy: true })

import { handler } from '../../ui/build/handler'

app.use(usersRoutes)
app.use(handler)

app.listen(3000, () => {
    console.log('Running on port 3000 ...')
})