<script lang="ts">
  import ChevronDoubleUpIcon from "$lib/icons/ChevronDoubleUpIcon.svelte";
  import LockIcon from "$lib/icons/LockIcon.svelte";
  import LockOpenVariantIcon from "$lib/icons/LockOpenVariantIcon.svelte";
  import StarOutlineIcon from "$lib/icons/StarOutlineIcon.svelte";
  import { GameModes, Maps, Regions, type Server } from "$lib/types";
  import { favoriteStore } from "$lib/stores";
  import { Button, TableBodyCell, TableBodyRow, Tooltip } from "flowbite-svelte";
  import StarIcon from "$lib/icons/StarIcon.svelte";

  export let server: Server;

  // TODO: Do a real check if the image actually exists in the file structure
  // Bug happens if the map is in Maps but the image does not exist
  $: imageName = Maps.includes(server.Map) ? server.Map.toLowerCase() : "unknown";
  $: gameMode = GameModes[server.Gamemode as keyof typeof GameModes] || "Unknown mode";
  const regionChar = Regions[server.Region as keyof typeof Regions] || "🌍";

  $: isFavorite = $favoriteStore.includes(server.Name) ? true : false;

  const tooltipPassword = server.HasPassword ? "Password protected" : "No password";
  const tooltipOfficial = server.IsOfficial ? "Official server" : "Community server";
  $: tooltipFavorite = isFavorite ? "Remove as favorite" : "Add as favorite";
  const passwordIconSize = 25;
  const officialIconsize = 30;

  function toggleFavorite(name: string) {
    if ($favoriteStore.includes(name)) {
      $favoriteStore = $favoriteStore.filter((s) => s !== name);
    } else {
      $favoriteStore = [...$favoriteStore, name];
    }
  }
</script>

<TableBodyRow color="custom" class="dark:border-surface-900">
  <TableBodyCell class="p-3 pr-0 w-5">
    {#if !server.IsOfficial}
      <Button
        on:click={() => toggleFavorite(server.Name)}
        pill={true}
        color="none"
        class="!p-2 focus:ring-0 hover:bg-surface-200 dark:hover:bg-surface-500/20"
      >
        {#if isFavorite}
          <StarIcon width="25" height="25" class="text-yellow-400/80" />
        {:else}
          <StarOutlineIcon width="25" height="25" class="text-surface-100 dark:text-surface-500" />
        {/if}
      </Button>
      <Tooltip placement="right">{tooltipFavorite}</Tooltip>
    {/if}
  </TableBodyCell>
  <TableBodyCell class="p-3 w-9/12">
    <div class="flex gap-3">
      <div class="flex-none">
        <img
          class="shadow-sm"
          alt={server.Map}
          src="images/maps/{imageName}.png"
          width="87"
          height="43"
        />
      </div>
      <div class="flex-none">
        <div class="flex flex-col -mb-1">
          <div
            class="-mt-0.5 text-surface-500 dark:text-surface-100 font-medium"
            class:dark:text-yellow-400={isFavorite}
            class:text-yellow-400={isFavorite}
          >
            {server.Name}
          </div>
          <div>
            <div class="flex gap-1.5">
              <div>
                {regionChar}
              </div>
              <Tooltip placement="right">{server.Region.split("_")[0]}</Tooltip>
              <div
                class="mt-1 text-xs text-surface-400 dark:text-surface-300 tracking-wide font-normal"
              >
                {gameMode} • {server.Map} ({server.MapSize}) • {server.DayNight} • {server.Hz}Hz
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TableBodyCell>

  <TableBodyCell>
    <div class="flex gap-7">
      <div>
        {#if server.HasPassword}
          <LockIcon
            width={passwordIconSize}
            height={passwordIconSize}
            class="text-surface-500 dark:text-surface-200"
          />
        {:else}
          <LockOpenVariantIcon
            width={passwordIconSize}
            height={passwordIconSize}
            class="text-surface-500/10 dark:text-surface-200/5"
          />
        {/if}
        <Tooltip placement="left">{tooltipPassword}</Tooltip>
      </div>
      <div>
        {#if server.IsOfficial}
          <ChevronDoubleUpIcon
            width={officialIconsize}
            height={officialIconsize}
            class="-mt-0.5 text-surface-500 dark:text-surface-200"
          />
        {:else}
          <ChevronDoubleUpIcon
            width={officialIconsize}
            height={officialIconsize}
            class="-mt-0.5 text-surface-500/10 dark:text-surface-200/5"
          />
        {/if}
        <Tooltip placement="right">{tooltipOfficial}</Tooltip>
      </div>
    </div>
  </TableBodyCell>

  <TableBodyCell class="font-normal">
    <p class="text-surface-600 dark:text-surface-200">
      {server.Players} / {server.MaxPlayers}

      <span class="pl-2 text-surface-300 dark:text-surface-400"
        >{server.QueuePlayers > 0 ? "(" + server.QueuePlayers + ")" : ""}</span
      >
    </p>
  </TableBodyCell>
</TableBodyRow>
