import multer from '@koa/multer'
import Router from '@koa/router'
import { Middleware, Next, ParameterizedContext } from 'koa'
import { parse } from '../../../lib/fit'
import { upload } from '../../../lib/minio'

const m = multer({ limits: { files: 1 } })

const authGuard: Middleware = (ctx: ParameterizedContext, next: Next) => {
  const { user } = ctx.state

  if (!user)
    ctx.throw(401, 'Unauthorized')

  return next()
}

const router = new Router({
  prefix: '/activity',
})

// router.use(authGuard)

router.put('/', authGuard, m.single('fitfile'), async (ctx: ParameterizedContext) => {
  const { file: fitfile } = ctx.request

  ctx.assert.ok(fitfile?.originalname.endsWith('.fit'), 500, 'no .fit file provided')
  console.log(`### fitfile ${fitfile.originalname} (${fitfile.size})`)

  const fitdata = await parse(fitfile.buffer)
  console.log('fitdata', fitdata.file_ids[0])
  const upInfo = await upload('fitfile', fitfile.originalname, fitfile.buffer)

  console.log(`#### fitfile upload etag:${upInfo.etag}`)

  ctx.status = 200
  ctx.body = {
    etag: upInfo.etag
  }
})

// TODO:
// - save file to minio
//    - secured area
//    - split profile.sub for folder/names
// - save fitdata to redis
//    - key: $profile.sub/fitfile.name
// - create basic activity in database
//    - fill with basic information
//      - distance, time, elevation, calories

export const routes = router.routes()