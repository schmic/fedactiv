import { writable } from "svelte/store";

export const UserContext = Symbol()

export const userProfile = writable<Profile>()
