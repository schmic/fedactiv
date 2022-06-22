<script lang="ts" context="module">
</script>

<script lang="ts">
  let fitfile: File;

  const fileOnChange = (evt: Event) => {
    console.log(`fileoOnChange`);
    const target = evt.target! as HTMLInputElement;
    fitfile = target.files?.item(0) as File;
  };

  const onSubmit = async () => {
    console.log(`submit`, fitfile);

    const formData = new FormData();
    formData.append("fitfile", fitfile);

    // FIXME: call page endpoint without fixed pathname
    const resp = await fetch("/activity/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    // TODO: get the redirection to the new activity and go there
    console.log("resp.svelte", resp);
  };
</script>

<form method="post" enctype="multipart/form-data">
  <label for="fitfile">The fitfile:</label>
  <input
    type="file"
    name="fitfile"
    id="fitfile"
    accept=".fit"
    on:change={fileOnChange}
  />
  {#if fitfile}
    <button type="submit">Create item</button>
  {/if}
</form>

<style>
</style>
