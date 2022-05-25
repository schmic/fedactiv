interface ImportMetaEnv {
    VITE_DOMAIN: string
    VITE_OIDC_SERVER: string
    VITE_OIDC_CLIENT_ID: string
}

type User = {
    id: string
    name: string
    summary: string
    icon: string
}