<script>
  import { onMount } from "svelte";
  import { navigateTo } from "svelte-router-spa";
  import { user } from "../stores/user";

  onMount(() => {
    user.logout();
    navigateTo("/login");
  });
</script>

<div class="flex items-center justify-center">
  <div>Logout</div>
</div>
