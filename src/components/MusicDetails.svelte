<script>
  import Chord from "./Chord.svelte";
  import { Button, Dialog } from "smelte";
  export let music;
  export let open;
</script>

{#if music}
  <Dialog bind:value={open} class="w-full md:w-1/2 lg:w-1/3">
    <h5 slot="title">Details of {music.name} ({music.user[0].username})</h5>
    <div class="flex justify-center">
      {#each music.chords as c}
        <span class="p-2 bg-blue-400 rounded text-white mx-2">{c}</span>
      {/each}
    </div>
    <div slot="actions" class="text-right">
      <Button color="secondary" text on:click={() => (open = false)}>
        Cancel
      </Button>
    </div>
  </Dialog>
{/if}
