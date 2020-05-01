<script>
  import { Route } from "svelte-router-spa";
  import Navbar from "../components/Navbar.svelte";

  export let currentRoute;
  export let params;
</script>

<Navbar {currentRoute} />
<div class="container px-5 pt-16 mx-auto">
  <Route {currentRoute} {params} />
</div>
