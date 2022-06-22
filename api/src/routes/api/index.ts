import Router from '@koa/router'
import { routes as activityRoutes } from './activity'

const apiRouter = new Router({ prefix: '/api' })

apiRouter.use(activityRoutes)

export const routes = apiRouter.routes()
