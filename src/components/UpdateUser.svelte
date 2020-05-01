<script>
  import {
    Button,
    Dialog,
    TextField,
    Select,
    notifier,
    Notifications
  } from "smelte";
  import { createEventDispatcher, onDestroy } from "svelte";
  import { client } from "../services/http";
  export let user;
  export let open = false;

  const dispatch = createEventDispatcher();

  let _username = "";
  let _email = "";
  let roles = [
    {
      value: "member",
      text: "Member"
    },
    {
      value: "admin",
      text: "Admin"
    }
  ];

  function close() {
    open = false;
  }
  function format(s) {
    const d = new Date(s);

    return `${pad(d.getDate())}/${pad(
      d.getMonth() + 1
    )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
      d.getSeconds()
    )}`;
  }
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  async function update() {
    try {
      await client.patch("/admin/user", {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      });
      dispatch("user_updated");
    } catch (error) {
      notifier.alert(error.response.data.error);
    }
  }
</script>

<Dialog bind:value={open} class="w-full md:w-1/2 lg:w-1/3">
  <h5 slot="title">Update user</h5>
  <TextField error={_username} bind:value={user.username} label="Username" />
  <TextField error={_email} bind:value={user.email} label="Email" />
  <Select label="Role" items={roles} bind:value={user.role} />
  <div class="flex justify-between">
    <p class="font-semibold mr-2">Created at:</p>
    {format(user.createdAt)}
  </div>
  <div class="flex justify-between">
    <p class="font-semibold mr-2">Updated at:</p>
    {format(user.updatedAt)}
  </div>
  <div class="flex justify-between">
    <p class="font-semibold mr-2">Drafts:</p>
    {user.drafts ? user.drafts.length : 0}
  </div>
  <div class="flex justify-between">
    <p class="font-semibold mr-2">Historic:</p>
    {user.historic ? user.historic.length : 0}
  </div>
  <div slot="actions" class="text-right">
    <Button on:click={update}>Update</Button>
    <Button color="secondary" text on:click={close}>Cancel</Button>
  </div>
</Dialog>

<Notifications />
