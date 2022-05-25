export async function get({ url }) {
    const searchParams: URLSearchParams = url.searchParams
    const resource = searchParams.get('resource')
    const config = { domain: 'fedactiv.schmic.eu' }

    if (!resource)
        return {
            status: 400,
            body: 'Bad request. Please make sure "acct:USER@DOMAIN" is what you are sending as the "resource" query parameter.'
        }

    const userStr = `${resource}`.replace('acct:', '')
    const [id, domain] = userStr.split('@')

    console.log('webfinger for', userStr);

    if (config.domain !== domain)
        return {
            status: 400,
            body: 'Bad request. This domain is not valid here.'
        }

    const response = await fetch(`https://${domain}/users/${id}`, {
        headers: { accept: "application/activity+json" },
    });

    if (!response.ok) {
        console.log('no such resource')
        return {
            status: 404,
            body: "No such resource."
        }
    }

    console.log('response', response)

    const body = {
        "subject": `acct:${userStr}`,
        "aliases": [
            `https://${domain}/@${id}`,
            `https://${domain}/users/${id}`
        ],
        "links": [
            { "rel": "http://webfinger.net/rel/profile-page", "type": "text/html", "href": `https://${domain}/@${id}` },
            { "rel": "self", "type": "application/activity+json", "href": `https://${domain}/users/${id}` },
        ]
    }

    return { body }
}