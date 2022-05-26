<script lang="ts">
  import Link from "$components/navbar/link.svelte";
  import { userProfile } from "$lib/users";

  let hidden = true;
  let loggedin = false;

  $: loggedin = $userProfile !== undefined;
</script>

<nav
  class="relative flex flex-wrap items-center justify-between px-4 py-3 bg-lime-500"
>
  <div
    class="container px-2 mx-auto flex flex-wrap items-center justify-between"
  >
    <div
      class="w-full relative flex justify-between lg:w-auto px-2 lg:static lg:block lg:justify-start"
    >
      <a
        class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
        href="/"
      >
        fedactiv
      </a>
      <button
        on:click={() => {
          hidden = !hidden;
        }}
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
      >
        <span class="block relative w-6 h-px rounded-sm bg-white" />
        <span class="block relative w-6 h-px rounded-sm bg-white mt-1" />
        <span class="block relative w-6 h-px rounded-sm bg-white mt-1" />
      </button>
    </div>
    <div class="{hidden ? 'hidden' : ''} lg:flex flex-grow items-center">
      <ul class="flex flex-col lg:flex-row list-none ml-auto">
        {#if loggedin}
          <Link href="/users/{$userProfile?.username}" text="Profile" />
          <Link href="/auth/logout" text="Logout" />
        {:else}
          <Link href="/auth/login" rel="external" text="Login" />
        {/if}
      </ul>
    </div>
  </div>
</nav>
