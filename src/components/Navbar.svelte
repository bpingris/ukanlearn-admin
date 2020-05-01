<script>
  export let currentRoute;
  let menu = [
    {
      name: "Users",
      to: "/users"
    },
    {
      name: "Chords",
      to: "/chords"
    },
    {
      name: "Musics",
      to: "/musics"
    },
    {
      name: "Logout",
      to: "/logout"
    }
  ];
  let show = false;
</script>

<div
  class="bg-primary-500 z-30 fixed top-0 w-full items-center justify-between
  flex left-0 h-16">
  <a href="/" class="ml-2 text-white text-xl font-thin">
    Ukanlearn - Backoffice
  </a>
  <div>
    {#each menu as item}
      <a
        class="p-4 text-white rounded"
        class:bg-white={currentRoute.name === item.to}
        class:shadow={currentRoute.name === item.to}
        class:text-primary-600={currentRoute.name === item.to}
        href={item.to}>
        {item.name}
      </a>
    {/each}
  </div>
</div>
