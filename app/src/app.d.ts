/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		profile?: Profile
	}

	// interface Platform {}

	interface Session {
		profile?: Profile
	}

	// interface Stuff {}
}
