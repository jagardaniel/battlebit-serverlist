<script lang="ts">
  import ServerRow from "./ServerRow.svelte";
  import type { Server, ServerFilters } from "$lib/types";
  import { Table, TableBody, TableBodyRow } from "flowbite-svelte";
  import { getFilterContext } from "$lib/FilterContext";

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

  $: filteredServers = filterServers(servers, $context);
</script>

<Table color="custom" class="text-base border-t dark:border-surface-900">
  <TableBody>
    {#if filteredServers.length === 0}
      <TableBodyRow>
        <div class="m-4 text-center text-xl">No servers found</div>
      </TableBodyRow>
    {:else}
      {#each filteredServers as server, index (server.Name + index)}
        <ServerRow {server} />
      {/each}
    {/if}
  </TableBody>
</Table>
