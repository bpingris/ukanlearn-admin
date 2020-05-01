<script>
  import { TextField, Card, Button, notifier, Notifications } from "smelte";
  import { navigateTo } from "svelte-router-spa";
  import { user } from "../stores/user";

  async function login() {
    const error = await user.login(email, password);
    if (!error) {
      return navigateTo("/");
    }
    notifier.alert(error.response.data.error || "An error occured :(");
  }
  let email = "";
  let password = "";
</script>

<form on:submit|preventDefault={login}>
  <Card.Card hoverElevation="3" elevation="3">
    <div slot="title">
      <Card.Title title="Login" />
    </div>
    <div class="px-4" slot="text">
      <TextField label="Email" bind:value={email} />
      <TextField type="password" label="Password" bind:value={password} />
    </div>
    <div slot="actions">
      <div class="text-right p-4">
        <Button type="submit" color="blue">Login</Button>
      </div>
    </div>
  </Card.Card>
</form>
<Notifications />
