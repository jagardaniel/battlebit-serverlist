<script lang="ts">
  import { filterStore } from "$lib/store";
  import { GameModes, Regions, type DropdownItem, Maps } from "$lib/types";
  import FilterDropdown from "./FilterDropdown.svelte";
  import { Search } from "flowbite-svelte";

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

  const hasPassword: DropdownItem[] = [
    { value: "true", label: "Password" },
    { value: "false", label: "No password" },
  ];
</script>

<div class="grid grid-cols-6 gap-4">
  <div class="col-span-2">
    <Search
      color="none"
      class="bg-surface-600 border-surface-700 h-10"
      placeholder="Search server name..."
      bind:value={$filterStore.name}
    />
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
    <FilterDropdown filterKey="hasPassword" placeholder="Password set" items={hasPassword} />
  </div>
</div>
