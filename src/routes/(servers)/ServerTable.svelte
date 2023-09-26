<script lang="ts">
  import ServerRow from "./ServerRow.svelte";
  import type { Server, ServerFilters } from "$lib/types";
  import { getFilterContext } from "$lib/FilterContext";
  import { Table, TableBody, TableBodyRow } from "flowbite-svelte";
  import { paginate } from "svelte-paginate";
  import SlatePaginationNav from "./SlatePaginationNav.svelte";

  export let servers: Server[];

  const context = getFilterContext();

  function filterServers(servers: Server[], filters: ServerFilters) {
    let rows: Server[] = [];

    servers.forEach((server) => {
      // Filter by server name
      if (server.Name.toLowerCase().indexOf(filters.name.toLowerCase()) === -1) {
        return;
      }

      // Filter by game modes
      if (filters.gameModes.length > 0) {
        if (!filters.gameModes.some((item) => item == server.Gamemode)) {
          return;
        }
      }

      // Filter by regions
      if (filters.regions.length > 0) {
        if (!filters.regions.some((item) => item == server.Region)) {
          return;
        }
      }

      // Filter by maps
      if (filters.maps.length > 0) {
        if (!filters.maps.some((item) => item == server.Map)) {
          return;
        }
      }

      // Filter by server type
      if (filters.isOfficial.length > 0) {
        if (!filters.isOfficial.some((item) => item == server.IsOfficial.toString())) {
          return;
        }
      }

      // Filter by player size
      if (filters.maxPlayers.length > 0) {
        if (!filters.maxPlayers.some((item) => item == server.MaxPlayers.toString())) {
          return;
        }
      }

      // Filter by password configuration
      if (filters.hasPassword.length > 0) {
        if (!filters.hasPassword.some((item) => item == server.HasPassword.toString())) {
          return;
        }
      }

      rows.push(server);
    });

    return rows;
  }

  // Pagination from svelte-paginate (thank you, I don't need to think!)
  let currentPage = 1;
  $: pageSize = $context.itemsPerPage;
  $: items = filterServers(servers, $context);
  $: paginatedItems = paginate({ items, pageSize, currentPage });
  // Fix an issue where you can end up on a non existing page
  // Example, you are on page 8 but select a filter that only has 1 page
  $: if (currentPage > Math.ceil(items.length / pageSize)) {
    currentPage = Math.ceil(items.length / pageSize);
  }
</script>

<!-- Server table -->
<Table color="custom" class="text-base border-t dark:border-surface-900">
  <TableBody>
    {#each paginatedItems as server, index (server.Name + index)}
      <ServerRow {server} />
    {:else}
      <TableBodyRow>
        <div class="m-4 text-center text-xl">No servers found</div>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

<!-- Pagination navigation -->
{#if paginatedItems.length > 0}
  <SlatePaginationNav
    totalItems={items.length}
    {pageSize}
    {currentPage}
    limit={2}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
  />
{/if}
