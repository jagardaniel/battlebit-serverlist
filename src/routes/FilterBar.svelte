<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import ToolTip from "$lib/components/ToolTip.svelte";
  import BackspaceIcon from "$lib/icons/BackspaceIcon.svelte";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import MagnifyIcon from "$lib/icons/MagnifyIcon.svelte";
  import ReloadIcon from "$lib/icons/ReloadIcon.svelte";
  import StarIcon from "$lib/icons/StarIcon.svelte";
  import { filterStore } from "$lib/stores";
  import { type FilterDropdownItem, GameModes, Maps, Regions } from "$lib/types";
  import FilterDropdown from "./FilterDropdown.svelte";

  export let showFavorites: boolean;
  export let sortColumn: string;

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

  function handleClearFilters() {
    filterStore.reset();
    showFavorites = false;
    sortColumn = "";
  }

  function handleRefreshServers() {
    // Re-run load function for this page
    invalidateAll();
  }

  $: selectedSearchClass =
    $filterStore["name"].length > 0 ? "dark:bg-blue-700/10 dark:hover:bg-blue-700/30" : "";
  $: toggleFavoriteClass = showFavorites ? "dark:text-yellow-500" : "";
</script>

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
    {#if $filterStore.name.length > 0}
      <div class="flex absolute inset-y-0 right-2 items-center pl-3">
        <button
          on:click={() => {
            $filterStore.name = "";
          }}
        >
          <CloseIcon class="w-5 h-5" />
        </button>
      </div>
    {/if}
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
        <ToolTip text="Toggle favorites" class="mt-12">
          <button
            type="button"
            class="filter-round-button"
            on:click={() => {
              showFavorites = !showFavorites;
            }}
          >
            <StarIcon class="w-6 h-6 text-surface-500 dark:text-blue-200 {toggleFavoriteClass}" />
          </button>
        </ToolTip>
      </div>
      <div>
        <ToolTip text="Clear filters" class="mt-12">
          <button type="button" class="filter-round-button" on:click={handleClearFilters}>
            <BackspaceIcon class="w-6 h-6 text-surface-500 dark:text-blue-200" />
          </button>
        </ToolTip>
      </div>
      <div>
        <ToolTip text="Refresh servers" class="mt-12">
          <button type="button" class="filter-round-button" on:click={handleRefreshServers}>
            <ReloadIcon class="w-6 h-6 text-surface-500 dark:text-blue-200" />
          </button>
        </ToolTip>
      </div>
    </div>
  </div>
</div>
