<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import ReloadIcon from "$lib/icons/ReloadIcon.svelte";
  import BackspaceIcon from "$lib/icons/BackspaceIcon.svelte";
  import { favoriteStore, filterStore } from "$lib/stores";
  import { GameModes, Regions, type DropdownItem, Maps } from "$lib/types";
  import FilterDropdown from "./FilterDropdown.svelte";
  import { Button, Checkbox, CloseButton, Search, Tooltip } from "flowbite-svelte";
  import StarIcon from "$lib/icons/StarIcon.svelte";

  export let showFavorites: boolean;

  const gameModeItems: DropdownItem[] = Object.entries(GameModes).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const mapsItems: DropdownItem[] = Maps.map((item) => ({
    value: item,
    label: item,
  }));

  const regionsItems: DropdownItem[] = Object.entries(Regions).map(([key]) => ({
    value: key,
    label: key.split("_")[0],
  }));

  // Their API only supports official or not official right now so community
  // servers with progression and modded servers are in the same category
  const isOfficialItems: DropdownItem[] = [
    { value: "true", label: "Official" },
    { value: "false", label: "Community" },
  ];

  const maxPlayersItems: DropdownItem[] = [
    { value: "254", label: "127vs127" },
    { value: "128", label: "64vs64" },
    { value: "64", label: "32vs32" },
    { value: "32", label: "16vs16" },
    { value: "16", label: "8vs8" },
  ];

  function handleToggleFavorites() {
    showFavorites = !showFavorites;
  }

  function handleClearFilters() {
    filterStore.reset();
    showFavorites = false;
  }

  function handleRefreshServers() {
    // Re-run load function for this page
    invalidateAll();
  }

  $: selectedSearchClass = $filterStore["name"] ? "bg-surface-300/70 dark:bg-blue-700/10" : "";
  $: toggleFavoriteClass = showFavorites ? "text-yellow-400 dark:text-yellow-400" : "";
</script>

<div class="grid grid-cols-6 gap-4">
  <div class="col-span-2">
    <Search
      color="none"
      class="bg-surface-100/60 dark:bg-surface-600 border-surface-200 dark:border-surface-700 h-10 {selectedSearchClass}"
      placeholder="Search server name..."
      bind:value={$filterStore.name}
    >
      {#if $filterStore.name.length > 0}
        <CloseButton class="mr-2" on:click={() => ($filterStore.name = "")} />
      {/if}
    </Search>
  </div>
  <div>
    <FilterDropdown filterKey="gameModes" placeholder="Game modes" items={gameModeItems} />
  </div>
  <div>
    <FilterDropdown filterKey="maps" placeholder="Maps" items={mapsItems} />
  </div>
  <div>
    <FilterDropdown filterKey="regions" placeholder="Regions" items={regionsItems} />
  </div>
  <div>
    <FilterDropdown filterKey="isOfficial" placeholder="Server type" items={isOfficialItems} />
  </div>
  <div>
    <FilterDropdown filterKey="maxPlayers" placeholder="Max players" items={maxPlayersItems} />
  </div>
  <div>
    <Checkbox
      class="mt-2 ml-2 text-base font-normal hover:text-surface-500 hover:dark:text-surface-300"
      bind:checked={$filterStore.showPassword}
    >
      Show password set
    </Checkbox>
  </div>
  <div>
    <Checkbox
      class="mt-2 ml-2 text-base font-normal hover:text-surface-500 hover:dark:text-surface-300"
      bind:checked={$filterStore.showEmpty}
    >
      Show empty servers
    </Checkbox>
  </div>
  <div class="col-span-2" />
  <div>
    <div class="flex gap-2 justify-end">
      <div>
        <Button
          on:click={handleToggleFavorites}
          pill={true}
          color="none"
          class="!p-2 focus:ring-0 hover:bg-surface-200 dark:hover:bg-surface-600"
        >
          <StarIcon class="w-6 h-6 text-surface-500 dark:text-blue-200 {toggleFavoriteClass}" />
        </Button>
        <Tooltip>Toggle favorite servers</Tooltip>
      </div>

      <div>
        <Button
          on:click={handleClearFilters}
          pill={true}
          color="none"
          class="!p-2 focus:ring-0 hover:bg-surface-200 dark:hover:bg-surface-600"
        >
          <BackspaceIcon class="w-6 h-6 text-surface-500 dark:text-blue-200" />
        </Button>
        <Tooltip>Clear filters</Tooltip>
      </div>

      <div>
        <Button
          on:click={handleRefreshServers}
          pill={true}
          color="none"
          class="!p-2 focus:ring-0 hover:bg-surface-200 dark:hover:bg-surface-600"
        >
          <ReloadIcon class="w-6 h-6 text-surface-500 dark:text-blue-200" />
        </Button>
        <Tooltip>Refresh servers</Tooltip>
      </div>
    </div>
  </div>
</div>
