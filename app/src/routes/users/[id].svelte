<script lang="ts" context="module">
  import { browser } from "$app/env";
  import type { Load } from "$generated/routes/users/__types/[id]";
  import { config } from "$lib/config";

  const load_image = (url: string) => {
    return new Promise((fulfil, reject) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => fulfil(img);
      img.src = url;
    });
  };

  export const load: Load = async ({ props, session }) => {
    const { user } = props;
    const { profile } = session;

    if (browser) {
      await load_image(user.icon.url);
    }

    return {
      props: {
        user,
        profile,
        hasDropbox: profile?.dropbox?.connected ? true : false,
      },
    };
  };
</script>

<script lang="ts">
  export let user: PublicProfile;
  export let profile: Profile;
  export let hasDropbox: boolean;
</script>

<div class="flex flex-row bg-slate-50 p-4">
  <div class="flex flex-col items-start">
    <img
      class="w-20 h-20 md:w-40 md:h-40 rounded-full"
      src={user.icon.url}
      alt="user image of {user.preferred_username}"
    />
  </div>
  <div class="flex flex-grow flex-col items-end ">
    <p class="text-4xl text-green-500 mb-4 uppercase">
      {user.given_name}
      {user.family_name}
    </p>
    <p class="text-1xl text-center">
      {user.preferred_username}@{config.domain}
    </p>
    {#if profile?.preferred_username == user.preferred_username}
      <p class="text-1xl text-center">
        {#if hasDropbox}
          <a rel="external" href="/auth/dropbox/login">Dropbox Ready</a>
        {:else}
          <a rel="external" href="/auth/dropbox/login">Connect Dropbox</a>
        {/if}
      </p>
    {/if}
  </div>
</div>
