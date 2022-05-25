<script context="module" lang="ts">
  import type { Load } from "$generated/routes/__error";

  export const load: Load = ({ error, status, props }) => {
    return {
      props: {
        title: `${status}: ${error?.message}`,
      },
    };
  };
</script>

<script lang="ts">
  export let title: string;
</script>

<h1>{title}</h1>
