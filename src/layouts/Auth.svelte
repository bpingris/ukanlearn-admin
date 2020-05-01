<script>
  import { Route } from "svelte-router-spa";

  export let currentRoute;
  export let params = {};
</script>

<div class="min-h-screen flex items-center justify-center">
  <Route {currentRoute} {params} />
</div>
