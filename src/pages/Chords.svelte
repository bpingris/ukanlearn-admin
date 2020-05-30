<script>
  import { onMount } from "svelte";
  import { Card, Button, Dialog, Select } from "smelte";
  import { client } from "../services/http";
  import ChordEditor from "../components/Chord.svelte";
  import CreateChord from "../components/CreateChord.svelte";
  import Spinner from "../components/Spinner.svelte";

  export let currentRoute;
  export let params;
  currentRoute;
  params;

  let selectedChord = null;
  let confirmDeletion = false;
  let chords = null;
  let filterByInstrument = "";
  let filters = [
    { value: "", text: "All" },
    { value: "guitar", text: "Guitar" },
    { value: "ukulele", text: "Ukulele" }
  ];


  onMount(fetchChords);
  function fetchChords() {
    chords = client.get("/admin/chords");
  }
  function askDeleteConfirmation(e) {
    selectedChord = e;
    confirmDeletion = true;
  }

  async function deleteChord() {
    try {
      await client.delete(`/admin/chords/${selectedChord._id}`);
      selectedChord = null;
      confirmDeletion = false;
      fetchChords();
    } catch (error) {
      console.log({ error });
    }
  }

  let filteredChords = [];
  $: {
    filterByInstrument;
    if (chords && chords.then) {
      chords.then(o => {
        filteredChords = o.data.chords.filter(o =>
          filterByInstrument === "" ? true : o.instrument === filterByInstrument
        );
      });
    }
  }
</script>

<div class="text-center text-3xl font-thin my-4 ">Available Chords</div>

<CreateChord on:chord_created={fetchChords} />

{#await chords}
  <div class="text-center mt-5">
    <Spinner />

  </div>
{:then data}
  {#if data}
    <div class="w-1/2 mx-auto">
      <Select
        label="Filter by instrument"
        items={filters}
        bind:value={filterByInstrument} />
    </div>

    <div class="flex flex-wrap">
      {#each filteredChords as chord}
        <li
          class="list-none w-full sm:w-1/2 md:w-1/3 p-2 flex justify-center
          flex-col items-center">
          <Card.Card class="w-full" elevation="3">
            <div slot="title">
              <Card.Title title={chord.name} subheader={chord.instrument} />
            </div>
            <div
              slot="text"
              class="px-5 pb-0 pt-3 text-gray-800 body-2 flex justify-center">
              <ChordEditor
                readOnly
                instrument={chord.instrument}
                points={chord.strings} />
            </div>
            <div slot="actions" class="my-4">
              <div class="text-right p-2">
                <Button
                  color="error"
                  text
                  on:click={askDeleteConfirmation(chord)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card.Card>
        </li>
      {/each}
    </div>
  {/if}
{:catch error}
  <pre>{JSON.stringify(error, null, 2)}</pre>
{/await}

<Dialog bind:value={confirmDeletion}>
  <h5 slot="title">Are you sure you want to delete {selectedChord.name} ({selectedChord.instrument}) ?</h5>
  <div class="text-gray-700">You cant undo that !</div>
  <div slot="actions" class="text-right">
    <Button text on:click={deleteChord}>Yes</Button>
    <Button text on:click={() => (confirmDeletion = false)}>No</Button>
  </div>
</Dialog>
