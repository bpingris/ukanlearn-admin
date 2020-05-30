<script>
  import { onMount } from "svelte";
  import { Card, Button } from "smelte";
  import { client } from "../services/http";
  import Spinner from "../components/Spinner.svelte";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let musics = null;
  function fetchMusics() {
    musics = client.get("/admin/musics");
  }

  onMount(fetchMusics);
</script>

{#await musics}
  <div class="text-center mt-5">
    <Spinner />

  </div>
{:then data}
  {#if data}
    <div class="flex flex-wrap">
      {#if data.data.musics.length === 0}
        <p class="text-4xl mt-56 mx-auto">NO MUSICS</p>
      {:else}
        {#each data.data.musics as music}
          <li
            class="list-none w-full sm:w-1/2 md:w-1/3 p-2 flex justify-center
            flex-col items-center">
            <Card.Card class="w-full" elevation="3">
              <div slot="title">
                <Card.Title title={chord.name} subheader={chord.instrument} />
              </div>
              <div
                slot="text"
                class="px-5 pb-0 pt-3 text-gray-800 body-2 flex justify-center" />
              <div slot="actions" class="my-4">
                <div class="text-right p-2">
                  <Button color="error" text on:click={() => {}}>Delete</Button>
                </div>
              </div>
            </Card.Card>
          </li>
        {/each}
      {/if}
    </div>
  {/if}
{/await}
