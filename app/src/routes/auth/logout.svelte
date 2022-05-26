<script lang="ts">
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  import { clearUserStore } from "$lib/users";
  if (browser) {
    clearUserStore(window.sessionStorage);
    goto("/");
  }
</script>

Logging you out ...
