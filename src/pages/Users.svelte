<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { client } from "../services/http";
  import { List, Card, Button, Dialog } from "smelte";
  import CreateUser from "../components/CreateUser.svelte";
  import UpdateUser from "../components/UpdateUser.svelte";
  import Spinner from "../components/Spinner.svelte";
  export let currentRoute;
  export let params;
  currentRoute;
  params;

  function fetchUsers() {
    users = client.get("/admin/users");
  }
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  function format(s) {
    const d = new Date(s);

    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }

  async function deleteUser() {
    console.log({ selectedUser });

    await client.delete(`/admin/users/${selectedUser._id}`);
    fetchUsers();
    confirmDeletion = false;
    selectedUser = null;
  }
  function askDeleteConfirmation(u) {
    selectedUser = u;
    confirmDeletion = true;
  }

  function userDetails(u) {
    selectedUser = u;
    openDetails = true;
  }

  function formatData(data) {
    return data.map(o => ({ ...o, id: o._id }));
  }

  let selectedUser = null;
  let users = null;
  let confirmDeletion = false;
  let openDetails = false;
  onMount(fetchUsers);
</script>

<CreateUser on:user_created={fetchUsers} />
{#if openDetails}
  <UpdateUser
    on:user_updated={fetchUsers}
    bind:open={openDetails}
    user={selectedUser} />
{/if}
{#await users}
  <div class="text-center mt-5">
    <Spinner />
  </div>
{:then data}
  {#if data}
    <div class="flex flex-wrap">
      {#each data.data.users as item (item._id)}
        <li class="list-none w-full sm:w-1/2 md:w-1/3 p-2">
          <Card.Card class="w-full" elevation="3">
            <div slot="title">
              <Card.Title title={item.username} subheader={item.email} />
            </div>
            <div slot="text" class="px-5 pb-0 pt-3 text-gray-800 body-2">
              <div class="flex justify-between">
                <p class="font-semibold mr-2">Role:</p>
                {item.role}
              </div>
              <div class="flex justify-between">
                <p class="font-semibold mr-2">Created at:</p>
                {format(item.created_at)}
              </div>
              <div class="flex justify-between">
                <p class="font-semibold mr-2">Updated at:</p>
                {format(item.updated_at)}
              </div>
              <div class="flex justify-between">
                <p class="font-semibold mr-2">Drafts:</p>
                {item.drafts ? item.drafts.length : 0}
              </div>
              <div class="flex justify-between">
                <p class="font-semibold mr-2">Historic:</p>
                {item.historic ? item.historic.length : 0}
              </div>
              <div class="flex justify-between">
                <p class="font-semibold mr-2">Activated:</p>
                {item.activated}
              </div>
            </div>
            <div slot="actions" class="my-4">
              <div class="text-right p-2">
                <Button on:click={userDetails(item)}>Details</Button>
                <Button
                  color="error"
                  text
                  on:click={askDeleteConfirmation(item)}>
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
  <h5 slot="title">
    Are you sure you want to delete {selectedUser.username} ?
  </h5>
  <div class="text-gray-700">You cant undo that !</div>
  <div slot="actions" class="text-right">
    <Button text on:click={deleteUser}>Yes</Button>
    <Button text on:click={() => (confirmDeletion = false)}>No</Button>
  </div>
</Dialog>
