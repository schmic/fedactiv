import type { GetSession, Handle } from "@sveltejs/kit";
import { parse } from "cookie";
import jwt_decode from "jwt-decode";
import { config } from "./lib/config";

const { oidc } = config

export const handle: Handle = async ({ event, resolve }) => {
    const accept_header = event.request.headers.get('accept')
    if (accept_header)
        event.request.headers.set('accept', accept_header.replace('/ld+json', '/json'))

    // const cookies = parse(event.request.headers.get('cookie') || '')

    // const introspect_endpoint = `${oidc.server}/auth/realms/springdemo/protocol/openid-connect/token/introspect`
    // // client_id & _secret notwendig?

    // const { sid } = cookies
    // console.log('sid', sid)

    // before endpoint

    console.log(`handle() before`)

    const response = await resolve(event);

    // after endpoint
    console.log(`handle() after`)

    return response
};

export const getSession: GetSession = ({ request }) => {
    const cookies = parse(request.headers.get('cookie') || '')

    console.log(`getSession()`)

    if (!cookies.sid)
        return {};

    return {
        profile: jwt_decode<Profile>(cookies.sid)
    }
};
