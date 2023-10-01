<script lang="ts">
  import ServerRow from "./ServerRow.svelte";
  import type { Server, ServerFilters } from "$lib/types";
  import { filterStore } from "$lib/store";
  import { Button, Table, TableBody, TableBodyRow } from "flowbite-svelte";
  import { paginate } from "svelte-paginate";

  export let servers: Server[];

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
  let itemsPerPage = 15;
  $: pageSize = itemsPerPage;
  $: items = filterServers(servers, $filterStore);
  $: paginatedItems = paginate({ items, pageSize, currentPage });
  $: totalPages = Math.ceil(items.length / pageSize);

  // Fix an issue where you can end up on a non existing empty page
  // Example: you are on page 8 but select a filter that only has 1 page
  $: if (currentPage > Math.ceil(items.length / pageSize)) {
    currentPage = 1;
  }

  function handlePageClick(page: number) {
    currentPage = page;
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

<!-- TODO: Should probably be a separate component in the future -->
{#if paginatedItems.length > 0}
  <div class="-mb-0.5 w-full bg-surface-50/30 dark:bg-surface-500 border-t dark:border-surface-900">
    <div class="flex items-center justify-center">
      <div>
        {#each { length: totalPages } as _, i}
          <Button
            size="lg"
            color="none"
            class="rounded-none hover:bg-surface-100 dark:hover:bg-surface-700 focus:ring-0 {i +
              1 ==
            currentPage
              ? 'bg-surface-100 dark:bg-surface-700 dark:text-blue-200'
              : ''}"
            on:click={() => handlePageClick(i + 1)}
            >{i + 1}
          </Button>
        {/each}
      </div>
    </div>
  </div>
{/if}
