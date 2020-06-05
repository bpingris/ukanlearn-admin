<script>
  import { createEventDispatcher } from "svelte";
  import {
    Button,
    Dialog,
    TextField,
    Select,
    notifier,
    Notifications
  } from "smelte";
  import { client } from "../services/http";
  export let open = false;

  const dispatch = createEventDispatcher();

  function cancel() {
    open = false;
    username = "";
    email = "";
    password = "";
    role = "member";
  }

  function validate() {
    if (username.length === 0) {
      _username = "Username is required.";
    } else {
      _username = "";
    }
    if (email.length === 0) {
      _email = "Email is required.";
    } else {
      _email = "";
    }
    if (password.length === 0) {
      _password = "Password is required.";
    } else {
      _password = "";
    }

    return _username.length + _password.length + _email.length === 0;
  }

  async function createUser() {
    if (!validate()) return;
    try {
      await client.post("/admin/users", {
        username,
        email,
        password,
        role
      });
      cancel();
      dispatch("user_created");
    } catch (error) {
      notifier.alert(error.response.data.error || "Cant create a user");
    }
  }

  let username = "";
  let _username = "";
  let email = "";
  let _email = "";
  let password = "";
  let _password = "";
  let role = "member";

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
</script>

  <Button on:click={() => (open = true)}>Create</Button>


<Dialog bind:value={open} class="w-full md:w-1/2 lg:w-1/3">
  <h5 slot="title">Create a new user</h5>
  <TextField error={_username} bind:value={username} label="Username" />
  <TextField error={_email} bind:value={email} label="Email" />
  <TextField type="password" error={_password} bind:value={password} label="Password" />
  <Select label="Role" items={roles} bind:value={role} />

  <div slot="actions" class="text-right">
    <Button on:click={createUser}>Create</Button>
    <Button color="secondary" text on:click={cancel}>Cancel</Button>
  </div>
</Dialog>

<Notifications />
