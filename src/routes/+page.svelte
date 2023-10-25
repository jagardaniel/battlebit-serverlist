<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import {
    type FilterDropdownItem,
    type Server,
    type ServerFilter,
    GameModes,
    Maps,
    Regions,
  } from "$lib/types";
  import FilterDropdown from "./FilterDropdown.svelte";
  import { favoriteStore, filterStore } from "$lib/stores";

  import StarIcon from "$lib/icons/StarIcon.svelte";
  import BackspaceIcon from "$lib/icons/BackspaceIcon.svelte";
  import ReloadIcon from "$lib/icons/ReloadIcon.svelte";
  import MagnifyIcon from "$lib/icons/MagnifyIcon.svelte";
  import SortIcon from "$lib/icons/SortIcon.svelte";
  import SortUpIcon from "$lib/icons/SortUpIcon.svelte";
  import SortDownIcon from "$lib/icons/SortDownIcon.svelte";
  import ServerRow from "./ServerRow.svelte";
  import ChevronLeftIcon from "$lib/icons/ChevronLeftIcon.svelte";
  import ChevronRightIcon from "$lib/icons/ChevronRightIcon.svelte";
  import ChevronDoubleLeftIcon from "$lib/icons/ChevronDoubleLeftIcon.svelte";
  import ChevronDoubleRightIcon from "$lib/icons/ChevronDoubleRightIcon.svelte";

  export let data;

  let filteredServers: Server[];
  let showFavorites = false;
  const sortIconSize = 13;

  // Data for our checkbox filters
  const gameModeItems: FilterDropdownItem[] = Object.entries(GameModes).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const mapsItems: FilterDropdownItem[] = Maps.map((item) => ({
    value: item,
    label: item,
  }));

  const regionsItems: FilterDropdownItem[] = Object.entries(Regions).map(([key]) => ({
    value: key,
    label: key.split("_")[0],
  }));

  // Their API only supports official or community servers as server type.
  const isOfficialItems: FilterDropdownItem[] = [
    { value: "true", label: "Official" },
    { value: "false", label: "Community" },
  ];

  const maxPlayersItems: FilterDropdownItem[] = [
    { value: "254", label: "127vs127" },
    { value: "128", label: "64vs64" },
    { value: "64", label: "32vs32" },
    { value: "32", label: "16vs16" },
    { value: "16", label: "8vs8" },
  ];

  // Only show the server if the name is saved in the favorite store
  function filterFavoriteServers(servers: Server[], favorites: string[]) {
    let rows: Server[] = [];

    servers.forEach((server) => {
      if (favorites.includes(server.Name)) {
        rows.push(server);
      }
    });

    return rows;
  }

  // Filter servers based on filters set by the dropdown checkbox menus
  // TODO: There is probably a better and more dynamic way to implement these filters
  function filterServers(servers: Server[], filters: ServerFilter) {
    let rows: Server[] = [];

    servers.forEach((server) => {
      // Filter server name
      if (server.Name.toLowerCase().indexOf(filters.name.toLowerCase()) === -1) {
        return;
      }

      // Filter game modes
      if (filters.gameModes.length > 0) {
        if (!filters.gameModes.some((item) => item == server.Gamemode)) {
          return;
        }
      }

      // Filter regions
      if (filters.regions.length > 0) {
        if (!filters.regions.some((item) => item == server.Region)) {
          return;
        }
      }

      // Filter maps
      if (filters.maps.length > 0) {
        if (!filters.maps.some((item) => item == server.Map)) {
          return;
        }
      }

      // Filter server type
      if (filters.isOfficial.length > 0) {
        if (!filters.isOfficial.some((item) => item == server.IsOfficial.toString())) {
          return;
        }
      }

      // Filter player size
      if (filters.maxPlayers.length > 0) {
        if (!filters.maxPlayers.some((item) => item == server.MaxPlayers.toString())) {
          return;
        }
      }

      // Filter show password" checkbox
      if (!filters.showPassword) {
        if (server.HasPassword) return;
      }

      // Filter "show empty" checkbox
      if (!filters.showEmpty) {
        if (server.Players == 0) return;
      }

      rows.push(server);
    });

    return rows;
  }

  function handleClearFilters() {
    filterStore.reset();
    showFavorites = false;
  }

  function handleRefreshServers() {
    // Re-run load function for this page
    invalidateAll();

    sortBy = { col: "", ascending: true };
  }

  // Table column sort
  // Most likely not very optimal, I tried to implement a mix from
  // https://www.youtube.com/watch?v=TKIALJcTJDU
  // https://svelte.dev/repl/08aca4e5d75e4ba7b8b05680f3d3bf7a?version=3.49.0
  // ...and some StackOverflow posts.
  let sortBy = { col: "", ascending: true };

  function sortByNames() {
    if (sortBy.col == "names") {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = "names";
      sortBy.ascending = true;
    }

    // Trim server name to prevent servers starting with a space to appear first in the list
    if (sortBy.ascending) {
      filteredServers = filteredServers.sort((a: Server, b: Server) =>
        a.Name.trim() > b.Name.trim() ? 1 : b.Name.trim() > a.Name.trim() ? -1 : 0,
      );
    } else {
      filteredServers = filteredServers.reverse();
    }
  }

  function sortByPlayers() {
    if (sortBy.col == "players") {
      sortBy.ascending = !sortBy.ascending;
    } else {
      sortBy.col = "players";
      sortBy.ascending = true;
    }

    if (sortBy.ascending) {
      filteredServers = filteredServers.sort((a: Server, b: Server) => a.Players - b.Players);
    } else {
      filteredServers = filteredServers.reverse();
    }
  }

  // Reset sort if filters changes
  $: $filterStore, (sortBy = { col: "", ascending: true });

  $: if (showFavorites) {
    filteredServers = filterFavoriteServers(data.servers, $favoriteStore);
  } else {
    filteredServers = filterServers(data.servers, $filterStore);
  }

  // Pagination
  // Example from https://svelte.dev/repl/84a8d64a6f1e49feba8f6a491ecc55f5?version=3.35.0
  // TODO: Should probably be moved to a separate/shared component
  let perPage = 15;
  const perPageItems = [5, 15, 30, 50, 100];

  $: totalRows = filteredServers.length;
  $: currentPage = 0;
  $: totalPages = Math.ceil(totalRows / perPage);
  $: start = currentPage * perPage;
  $: end = currentPage === totalPages - 1 ? totalRows - 1 : start + perPage - 1;
  $: trimmedRows = filteredServers.slice(start, end + 1);
  $: totalRows, (currentPage = 0);
  $: currentPage, start, end;

  // A non-programmers attempt to do his own pagination navigation
  // Limit specifices the amount of pages to show around the current page
  // Example with pageNavLimit set to two: 2 3 [4] 5 6
  const pageNavLimit = 3;

  function pageNavigation(total: number, current: number, limit: number) {
    let pageNav = [];
    let startIndex = current - limit;
    let endIndex = current + limit;

    const startDiff = current - limit;
    const endDiff = endIndex - (total - 1);

    if (total > limit * 2 + 1) {
      if (startDiff < 0) {
        startIndex = 0;
        endIndex = current + limit + Math.abs(startDiff);
      }

      if (endDiff > 0) {
        startIndex -= endDiff;
        endIndex -= endDiff;
      }
    } else {
      // Show everything since the amount of pages are lower than the total limit
      startIndex = 0;
      endIndex = total - 1;
    }

    for (var i = startIndex; i <= endIndex; i++) {
      pageNav.push(i);
    }

    return pageNav;
  }

  $: pageNavItems = pageNavigation(totalPages, currentPage, pageNavLimit);

  $: selectedSearchClass =
    $filterStore["name"].length > 0 ? "dark:bg-blue-700/10 dark:hover:bg-blue-700/30" : "";

  $: toggleFavoriteClass = showFavorites ? "dark:text-yellow-500" : "";
</script>

<!-- Filter bar -->
<div class="p-4 dark:bg-surface-500">
  <div class="grid grid-cols-6 gap-4">
    <div class="col-span-2 relative w-full">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <MagnifyIcon class="w-6 h-6" />
      </div>
      <input
        type="text"
        placeholder="Enter server name..."
        class="w-full pl-11 filter-form {selectedSearchClass}"
        bind:value={$filterStore["name"]}
      />
    </div>
    <div>
      <FilterDropdown text="Regions" filterKey="regions" items={regionsItems} />
    </div>
    <div>
      <FilterDropdown text="Server type" filterKey="isOfficial" items={isOfficialItems} />
    </div>
    <div>
      <FilterDropdown text="Maps" filterKey="maps" items={mapsItems} />
    </div>
    <div>
      <FilterDropdown text="Game modes" filterKey="gameModes" items={gameModeItems} />
    </div>
    <div>
      <FilterDropdown text="Max players" filterKey="maxPlayers" items={maxPlayersItems} />
    </div>
    <div class="mt-2 ml-2">
      <label>
        <input type="checkbox" bind:checked={$filterStore.showPassword} class="filter-checkbox" />
        <span class="pl-0.5 dark:hover:text-surface-300">Show password set</span>
      </label>
    </div>
    <div class="mt-2 ml-2">
      <label>
        <input type="checkbox" bind:checked={$filterStore.showEmpty} class="filter-checkbox" />
        <span class="pl-0.5 dark:hover:text-surface-300">Show empty servers</span>
      </label>
    </div>
    <div class="col-span-2" />
    <div>
      <div class="flex gap-2 justify-end">
        <div>
          <button
            type="button"
            class="filter-round-button"
            on:click={() => {
              showFavorites = !showFavorites;
            }}
          >
            <StarIcon class="w-6 h-6 text-surface-500 dark:text-blue-200 {toggleFavoriteClass}" />
          </button>
        </div>
        <div>
          <button type="button" class="filter-round-button" on:click={handleClearFilters}>
            <BackspaceIcon class="w-6 h-6 text-surface-500 dark:text-blue-200" />
          </button>
        </div>
        <div>
          <button type="button" class="filter-round-button" on:click={handleRefreshServers}>
            <ReloadIcon class="w-6 h-6 text-surface-500 dark:text-blue-200" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Server table -->
<div>
  <table class="table-fixed w-full border-t dark:border-surface-900">
    <thead class="text-left text-sm uppercase dark:bg-surface-600">
      <th class="w-14" />
      <th class="px-3 py-2 w-9/12">
        <div class="flex gap-1">
          <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span class="cursor-pointer" on:click={sortByNames}>Servers</span>
          </div>
          <div>
            {#if sortBy.col != "names"}
              <SortIcon
                width={sortIconSize}
                height={sortIconSize}
                class="mt-1 dark:text-surface-400"
              />
            {:else if sortBy.ascending}
              <SortDownIcon
                width={sortIconSize}
                height={sortIconSize}
                class="dark:text-surface-400"
              />
            {:else}
              <SortUpIcon
                width={sortIconSize}
                height={sortIconSize}
                class="mt-1 dark:text-surface-400"
              />
            {/if}
          </div>
        </div>
      </th>
      <th />
      <th>
        <div class="flex gap-1">
          <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span class="cursor-pointer" on:click={sortByPlayers}>Players</span>
          </div>
          <div>
            {#if sortBy.col != "players"}
              <SortIcon
                width={sortIconSize}
                height={sortIconSize}
                class="mt-1 dark:text-surface-400"
              />
            {:else if sortBy.ascending}
              <SortDownIcon
                width={sortIconSize}
                height={sortIconSize}
                class="dark:text-surface-400"
              />
            {:else}
              <SortUpIcon
                width={sortIconSize}
                height={sortIconSize}
                class="mt-1 dark:text-surface-400"
              />
            {/if}
          </div>
        </div>
      </th>
    </thead>
    <tbody>
      {#each trimmedRows as server, index (server.Name + index)}
        <ServerRow {server} />
      {:else}
        <tr>
          <td colspan="4">
            <div class="m-4 text-center text-xl">
              {#if showFavorites}
                No favorite servers found
              {:else}
                No servers found
              {/if}
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Pagination -->
  <!-- TODO: Should probably be moved to a separate/shared component -->
  <div class="px-4 py-2 text-sm dark:bg-surface-600 border-t dark:border-surface-900">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <div>
          <select bind:value={perPage} class="filter-form text-sm">
            {#each perPageItems as item}
              <option value={item}>{item}</option>
            {/each}
          </select>
        </div>

        <div>
          Showing <b>{start + 1}</b> to <b>{end + 1}</b> of <b>{filteredServers.length}</b> results
        </div>
      </div>

      <div>
        <div class="flex gap-1 mt-1">
          <div class="flex-none">
            <button
              class="py-0.5 rounded-sm border-1"
              class:dark:bg-surface-700={currentPage != 0}
              class:dark:bg-gray-700={currentPage == 0}
              class:dark:hover:bg-surface-900={currentPage != 0}
              disabled={currentPage == 0}
              on:click={() => {
                currentPage = 0;
              }}
            >
              <ChevronDoubleLeftIcon width="24" height="24" />
            </button>
            <button
              class="py-0.5 rounded-sm border-1"
              class:dark:bg-surface-700={currentPage != 0}
              class:dark:bg-gray-700={currentPage == 0}
              class:dark:hover:bg-surface-900={currentPage != 0}
              disabled={currentPage == 0}
              on:click={() => {
                currentPage--;
              }}
            >
              <ChevronLeftIcon width="24" height="24" />
            </button>
          </div>

          {#each pageNavItems as page}
            <div class="flex-none">
              <button
                class="text-base px-2 py-0.5 rounded-sm border-1"
                class:dark:bg-surface-800={page != currentPage}
                class:dark:bg-blue-200={page == currentPage}
                class:dark:text-surface-900={page == currentPage}
                class:dark:hover:bg-surface-900={page != currentPage}
                disabled={page == currentPage}
                on:click={() => {
                  currentPage = page;
                }}
              >
                {page + 1}
              </button>
            </div>
          {/each}

          <div class="flex-none">
            <button
              class="py-0.5 rounded-sm border-1"
              class:dark:bg-surface-700={currentPage != totalPages - 1}
              class:dark:bg-gray-700={currentPage == totalPages - 1}
              class:dark:hover:bg-surface-900={currentPage != totalPages - 1}
              disabled={currentPage == totalPages - 1}
              on:click={() => {
                currentPage++;
              }}
            >
              <ChevronRightIcon width="24" height="24" />
            </button>
            <button
              class="py-0.5 rounded-sm border-1"
              class:dark:bg-surface-700={currentPage != totalPages - 1}
              class:dark:bg-gray-700={currentPage == totalPages - 1}
              class:dark:hover:bg-surface-900={currentPage != totalPages - 1}
              disabled={currentPage == totalPages - 1}
              on:click={() => {
                currentPage = totalPages - 1;
              }}
            >
              <ChevronDoubleRightIcon width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
