<script lang="ts" context="module">
  import { config } from "$lib/config";
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ props }) => {
    return { props };
  };
</script>

<script lang="ts">
  export let user: Record<string, any>;
</script>

<div class="flex flex-row bg-slate-50 p-4">
  <div class="flex flex-col items-start">
    <img
      class="w-20 h-20 md:w-40 md:h-40 rounded-full"
      src={user.icon.url}
      alt="user image of {user.name}"
    />
  </div>
  <div class="flex flex-grow flex-col items-end ">
    <p class="text-4xl text-green-500 mb-4 uppercase">
      {user.name}
    </p>
    <p class="text-1xl text-center">
      {user.preferredUsername}@{config.domain}
    </p>
  </div>
</div>
