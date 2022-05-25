const { VITE_DOMAIN, VITE_OIDC_SERVER, VITE_OIDC_CLIENT_ID } = import.meta.env


fetch(`${VITE_OIDC_SERVER}/.well-known/openid-configuration`)

export const config = {
    domain: VITE_DOMAIN,
    oidc: {
        server: VITE_OIDC_SERVER,
        client_id: VITE_OIDC_CLIENT_ID
    }
}