import { pool } from "$lib/database";
import type { GetSession, Handle } from "@sveltejs/kit";
import { parse } from "cookie";
import jwt_decode from "jwt-decode";

export const handle: Handle = async ({ event, resolve }) => {
    const cookies = parse(event.request.headers.get('cookie') || '')

    // TODO: check tokens in cookie and refresh if needed
    // const introspect_endpoint = `${oidc.server}/auth/realms/springdemo/protocol/openid-connect/token/introspect`

    if (cookies.sid) {
        event.locals.profile = jwt_decode<Profile>(cookies.sid)
    }

    // before endpoint
    console.log(`handle() before`)

    const response = await resolve(event);

    // after endpoint
    console.log(`handle() after`)

    return response
};

export const getSession: GetSession = async ({ locals }) => {
    const session: App.Session = {}

    if (!locals.profile) {
        return Promise.resolve(session)
    }

    session.profile = locals.profile

    const { preferred_username: userId } = locals.profile
    const select = await pool.query('SELECT "userId" FROM dropbox WHERE "userId" = $1', [userId])
    if (select.rowCount >= 1)
        session.profile.dropbox = { connected: true }

    return session
};
