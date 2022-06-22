interface ImportMetaEnv {
    VITE_DOMAIN: string
    VITE_OIDC_SERVER: string
    VITE_OIDC_CLIENT_ID: string
    VITE_DROPBOX_CLIENT_ID: string
    VITE_DROPBOX_CLIENT_SECRET: string
}

type PublicProfile = {
    preferred_username: string
    given_name: string
    family_name: string
    icon: {
        url: string
    }
}

type Profile = PublicProfile & {
    sub: string
    email: string
    email_verified: boolean
    dropbox?: {
        connected: boolean
    }
}