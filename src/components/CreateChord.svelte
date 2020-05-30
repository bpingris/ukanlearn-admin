<script>
  import { createEventDispatcher } from "svelte";
  import {
    Button,
    Dialog,
    TextField,
    Select,
    notifier,
    Notifications,
    RadioButton
  } from "smelte";
  import ChordEditor from "./Chord.svelte";
  import { client } from "../services/http";
  export let open = false;

  const dispatch = createEventDispatcher();
  let name = "";
  let instrument = "guitar";
  let points = [];
  
  function cancel() {
    open = false;
    name = "";
    instrument = "guitar";
    points = [];
  }

  async function createChord() {
    try {
      await client.post("/admin/chords", {
        name,
        instrument,
        strings: points
      });

      cancel();
      dispatch("chord_created");
    } catch (error) {
      notifier.alert(error.response.data.error || "Cant create a chord");
    }
  }

  function handleClick(e) {
    points = e.detail;
  }

  $: disabled = name.length === 0;
  $: {
    instrument;
    points = [];
  }
</script>

<div class="flex justify-center items-center my-5">
  <Button on:click={() => (open = true)}>Create</Button>
</div>

<Dialog bind:value={open} class="w-full md:w-1/2 lg:w-1/3">
  <h5 slot="title">Create a new chord</h5>

  <TextField bind:value={name} label="Chord name" />

  <div class="flex justify-around mb-2">
    <div>
      <input
        id="guitar"
        type="radio"
        name="instrument"
        value="guitar"
        bind:group={instrument} />
      <label class="cursor-pointer text-xl font-thin" for="guitar">
        Guitar
      </label>
    </div>
    <div>
      <input
        id="uk"
        type="radio"
        name="instrument"
        value="ukulele"
        bind:group={instrument} />
      <label class="cursor-pointer text-xl font-thin" for="uk">Ukulele</label>
    </div>
  </div>
  <div class="flex justify-center">
    <ChordEditor {instrument} {points} on:click={handleClick} />
  </div>

  <div slot="actions" class="text-right">
    <Button {disabled} on:click={createChord}>Create</Button>
    <Button color="secondary" text on:click={cancel}>Cancel</Button>
  </div>
</Dialog>

<Notifications />
