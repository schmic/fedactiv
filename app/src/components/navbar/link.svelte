<script lang="ts">
  export let href: string;
  export let rel: string = "";
  export let text: string;
</script>

<li class="nav-item">
  <a
    class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
    {href}
    {rel}
  >
    {text}
  </a>
</li>
