import { redis } from '$lib/redis';
import { pool } from '$src/lib/database';
import type { RequestHandler } from '@sveltejs/kit';

const getRedirectUri = (url: URL) => {
    return `${url.origin.replace('http:', 'https:')}${url.pathname.replace('/login', '/callback')}`
}

type DropboxTokenResponse = {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    scope: string
    uid: string
    account_id: string
}

export const get: RequestHandler = async ({ url, locals }) => {
    if (!locals.profile)
        throw new Error('No profile found, aborting')

    const { preferred_username: userId } = locals.profile

    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    if (!state || !code)
        throw new Error(`no code:${code} or state:${state} in response`)

    const { code_verifier } = JSON.parse(await redis.get(`dropbox:oidc:${state}`) || '{}')

    if (!code_verifier) {
        throw new Error(`no verifier found for state:${state}, please retry ...`)
    }

    const { VITE_DROPBOX_CLIENT_ID: client_id } = import.meta.env
    const redirect_uri = getRedirectUri(url)

    const tokenUrl = new URL(`https://www.dropbox.com/oauth2/token`)
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

    const tokenData: DropboxTokenResponse = await tokenResponse.json()
    await pool.query('INSERT INTO dropbox ("userId", "tokens") VALUES($1, $2) ON CONFLICT ("userId") DO UPDATE SET "tokens" = $2;', [userId, tokenData])

    return {
        status: 302,
        headers: {
            'Location': `/users/${locals.profile.preferred_username}`,
        },
    }
}
