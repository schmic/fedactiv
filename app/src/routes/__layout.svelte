<script lang="ts" context="module">
  import Navbar from "$components/navbar.svelte";
  import { UserContext } from "$lib/users";
  import type { Load } from "@sveltejs/kit";
  import { setContext } from "svelte";
  import "../app.css";

  export const load: Load = async ({ session }) => {
    const { profile } = session;
    return {
      props: {
        profile,
      },
    };
  };
</script>

<script lang="ts">
  export let profile: Profile;
  setContext(UserContext, profile);
</script>

<svelte:head>
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<Navbar />

<div class="p-4 max-w-6xl mx-auto">
  <slot />
</div>
