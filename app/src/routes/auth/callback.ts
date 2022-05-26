import { config } from '$lib/config';
import { redis } from '$lib/redis';
import type { RequestHandler } from '@sveltejs/kit';
import { serialize, type CookieSerializeOptions } from 'cookie';
import { createHash, randomUUID } from 'crypto';

const cookieOptions: CookieSerializeOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true, // process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24// 24h
}

const getRedirectUri = (url: URL) => {
    return `${url.origin.replace('http:', 'https:')}${url.pathname.replace('/login', '/callback')}`
}

export const get: RequestHandler = async ({ url }) => {
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!state || !code) // FIXME: check for error and messinge in searchParams first
        throw new Error(`no code:${code} or state:${state} in response`)

    const { code_verifier } = JSON.parse(await redis.get(`oidc:${state}`) || '{}')

    if (!code_verifier) {
        throw new Error(`no verifier found for state:${state}, please retry ...`)
    }

    const client_id = config.oidc.client_id
    const redirect_uri = getRedirectUri(url)

    const tokenUrl = new URL(`${config.oidc.server}/protocol/openid-connect/token`)
    const tokenBody = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id,
        code_verifier,
        redirect_uri,
        code,
    })

    const tokenResponse = await fetch(tokenUrl.href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: tokenBody
    })

    const tokenData = await tokenResponse.json()
    const { id_token, access_token, refresh_token } = tokenData



    const sessionId = `${createHash('sha256').update(randomUUID()).digest('hex')}`
    const sessionCookie = serialize('sid', sessionId, cookieOptions)
    const accessCookie = serialize('atkn', access_token, cookieOptions)
    const refreshCookie = serialize('rtkn', refresh_token, cookieOptions)

    return {
        status: 200,
        headers: {
            'Set-Cookie': [sessionCookie, accessCookie, refreshCookie]
        },
        body: {
            tokens: { id_token }
        }
    }
}
