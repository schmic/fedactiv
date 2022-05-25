<script lang="ts">
  import { browser } from "$app/env";
  import Navbar from "$components/navbar.svelte";
  import { initUserStore } from "$lib/users";
  import "../app.css";

  // setContext(UserContext, userProfile);

  if (browser) {
    initUserStore(window.sessionStorage);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
</svelte:head>

<Navbar />

<div class="p-4 max-w-6xl mx-auto">
  <slot />
</div>
