<script lang="ts">
  import ServerTable from "./ServerTable.svelte";
  import FilterBar from "./FilterBar.svelte";

  export let data;
</script>

<svelte:head>
  <title>BattleBit - Server List</title>
</svelte:head>

<div class="p-4 bg-surface-50/30 dark:bg-surface-500">
  <FilterBar />
</div>

<div>
  <ServerTable servers={data.servers} />
</div>
