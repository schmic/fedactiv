import { Next, ParameterizedContext } from 'koa'

export type ParameterizedAuthContext = ParameterizedContext & { auth: any }

const auth = async (ctx: ParameterizedContext, next: Next) => {
  // const accessHeader = ctx.header.authorization

  const { atkn: accessToken } = ctx.cookie

  if (!accessToken)
    return next()
}

export default auth