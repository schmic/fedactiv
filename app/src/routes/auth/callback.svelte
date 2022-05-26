<script lang="ts">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { initUserStore } from "$lib/users";

  export let tokens: Record<string, string>;

  if (browser) {
    const profile = initUserStore(window.sessionStorage, tokens);
    goto(`/users/${profile?.username}`);
  }
</script>

Logging you in ...
