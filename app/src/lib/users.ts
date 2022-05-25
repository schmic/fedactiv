import jwt_decode from "jwt-decode";
import { get, writable } from "svelte/store";

export type UserProfile = {
    id: string
    username: string
    name?: string
    email?: string
}

export const userProfile = writable<UserProfile | undefined>()

// export const UserContext = Symbol()
// export const getUserStore = () => getContext<Writable<UserProfile>>(UserContext)

export const initUserStore = (storage: Storage, newTokens?: Record<string, string>) => {
    if (newTokens) {
        window.sessionStorage.setItem("tokens", JSON.stringify(newTokens));
    }

    const tokens = JSON.parse(storage.getItem('tokens') || '{}')
    const { id_token } = tokens

    if (!id_token) {
        userProfile.set(undefined)
    }
    else {
        const profile = jwt_decode<Record<string, string>>(id_token)
        userProfile.set({
            id: profile.sid,
            username: profile.preferred_username,
            email: profile.email,
            name: profile.name
        })
    }

    return get(userProfile)
}

export const clearUserStore = (storage: Storage) => {
    window.sessionStorage.removeItem("tokens");
    initUserStore(storage);
}