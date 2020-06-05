<script>
  import { onMount } from "svelte";
  import { Card, Button, Image } from "smelte";
  import { client } from "../services/http";
  import Spinner from "../components/Spinner.svelte";
  import MusicDetails from "../components/MusicDetails.svelte";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let musics = null;
  function fetchMusics() {
    musics = client.get("/admin/musics");
  }

  onMount(fetchMusics);

  async function deleteMusic(music) {
    try {
      await client.delete(`/admin/musics/${music._id}`);
      fetchMusics();
    } catch (error) {
      console.error(error);
    }
  }

  function openDetail(music) {
    selectedMusic = music;
    open = true;
  }
  let open = false;
  let selectedMusic = null;
</script>

<div class="flex justify-center items-center my-5">
  <Button on:click={fetchMusics}>Refresh</Button>
</div>

<MusicDetails bind:open music={selectedMusic}/>

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
            on:click={() => openDetail(music)}
            class="list-none cursor-pointer w-full sm:w-1/2 md:w-1/3 p-2 flex
            justify-center flex-col items-center">
            <Card.Card class="w-full" elevation="3">
              <div slot="title">
                <Card.Title title={music.name} subheader={music.instrument} />
              </div>
              <div slot="media">
                <Image class="w-full" src={music.thumbnail} alt="kitty" />
              </div>
              <div
                slot="text"
                class="px-5 pb-0 pt-3 text-gray-800 body-2 flex justify-center" />
              <div slot="actions" class="my-4">
                <div class="text-right p-2">
                  <Button
                    color="error"
                    text
                    on:click={() => deleteMusic(music)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Card>
          </li>
        {/each}
      {/if}
    </div>
  {/if}
{/await}
