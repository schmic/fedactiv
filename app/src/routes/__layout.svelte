<script lang="ts" context="module">
  import { browser } from "$app/env";
  import Navbar from "$components/navbar.svelte";
  import { UserContext, userProfile } from "$lib/users";
  import type { Load } from "@sveltejs/kit";
  import { setContext } from "svelte";
  import "../app.css";

  export const load: Load = async ({ session }) => {
    if (browser && session.profile) {
      userProfile.set(session.profile);
    }
    return {};
  };
</script>

<script lang="ts">
  setContext(UserContext, userProfile);
</script>

<svelte:head>
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<Navbar />

<div class="p-4 max-w-6xl mx-auto">
  <slot />
</div>
