import type { RequestHandler } from "@sveltejs/kit";
import { serialize, type CookieSerializeOptions } from "cookie";

const cookieOptions: CookieSerializeOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: true, // process.env.NODE_ENV === 'production',
  expires: new Date(1970, 1, 1)
}

export const get: RequestHandler = async ({ url }) => {
  const sidCookie = serialize('sid', '', cookieOptions)
  const atknCookie = serialize('atkn', '', cookieOptions)
  const rtknCookie = serialize('rtkn', '', cookieOptions)

  return {
    status: 302,
    headers: {
      'Location': '/',
      'Set-Cookie': [sidCookie, atknCookie, rtknCookie]
    }
  }
}