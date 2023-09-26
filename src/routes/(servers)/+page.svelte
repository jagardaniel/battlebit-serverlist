<script lang="ts">
  import ServerTable from "./ServerTable.svelte";
  import FilterBar from "./FilterBar.svelte";
  import { setFilterContext } from "$lib/FilterContext";

  export let data;

  // Context for store
  setFilterContext();
</script>

<svelte:head>
  <title>BattleBit - Server List</title>
</svelte:head>

<div class="p-4 bg-surface-500">
  <FilterBar />
</div>

<div>
  <ServerTable servers={data.servers} />
</div>
