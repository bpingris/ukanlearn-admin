<script>
  import { createEventDispatcher } from "svelte";
  export let instrument = "ukulele";
  export let yGap = 25;
  export let xGap = 50;
  export let cases = 5;
  export let readOnly = false;

  export let previewRadius = 10;
  export let radius = 10;
  export let points;

  const dispatch = createEventDispatcher();

  let mouseX = 0;
  let mouseY = 0;

  $: circles = points.map(o => ({
    x: toDrawX(o.x),
    y: toDrawY(o.y)
  }));

  let previewX = toDrawX(0);
  let previewY = toDrawY(0);

  $: stringNb = instrument === "ukulele" ? 4 : 6;
  $: {
    const tmpX = toGridX(roundHalf(mouseX / xGap) * xGap);
    const tmpY = toGridY(Math.ceil((mouseY - yGap / 2) / yGap) * yGap);
    if (tmpX >= 0 && tmpX < cases) {
      previewX = toDrawX(tmpX);
    }
    if (tmpY >= 0 && tmpY < stringNb) {
      previewY = toDrawY(tmpY);
    }
  }

  $: width = xGap * cases;
  $: height = yGap * (stringNb + 1);

  function roundHalf(o) {
    return Math.ceil(o) - 0.5;
  }

  function toDrawY(y) {
    return (y + 1) * yGap;
  }

  function toDrawX(x) {
    return (x + 0.5) * xGap;
  }

  function toGridY(y) {
    return y / yGap - 1;
  }

  function toGridX(x) {
    return x / xGap - 0.5;
  }

  function mousemove(node) {
    if (readOnly) return;
    function handleMouseMove(e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    }
    node.addEventListener("mousemove", handleMouseMove);
    return {
      destroy() {
        node.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }

  function mouseclick(node) {
    if (readOnly) return;
    function handleMouseClick(e) {
      const circle = circles.find(o => o.x === previewX && o.y === previewY);
      if (!circle) {
        circles = [...circles, { x: previewX, y: previewY }];
        dispatch(
          "click",
          circles.map(o => ({ x: toGridX(o.x), y: toGridY(o.y) }))
        );
      } else {
        circles = circles.filter(o => o.x !== circle.x || o.y !== circle.y);
      }
    }
    node.addEventListener("click", handleMouseClick);
    return {
      destroy() {
        node.removeEventListener("click", handleMouseClick);
      }
    };
  }
</script>

<style>
  .string {
    stroke-width: 2px;
    stroke: darkblue;
  }

  .frete {
      stroke-width: 1px;
      stroke: #333
  }
  .start-string {
    stroke-width: 5px;
    stroke: black;
  }
</style>

<svg {width} {height} use:mousemove use:mouseclick>
  <line x1="0" y1="0" x2="0" y2={yGap * (stringNb + 1)} class="start-string" />
  {#each Array(stringNb) as _, i}
    <line
      x1="0"
      y1={yGap * (i + 1)}
      x2={width}
      y2={yGap * (i + 1)}
      class="string" />
  {/each}
  {#each Array(cases) as _, i}
    <line
      x1={xGap * i}
      y1="0"
      x2={xGap * i}
      y2={yGap * (stringNb + 1)}
      class="frete" />
  {/each}
  {#each circles as circle}
    <circle cx={circle.x} cy={circle.y} r={radius} />
  {/each}
  {#if !readOnly}
    <circle cx={previewX} cy={previewY} r={previewRadius} fill="#3339" />
  {/if}
</svg>

