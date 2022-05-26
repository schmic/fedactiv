import Koa from 'koa'
import { routes as usersRoutes } from './routes/users'

const app = new Koa({ proxy: true })

app.use(usersRoutes)

app.listen(3000, () => {
    console.log('Running on port 3000 ...')
})