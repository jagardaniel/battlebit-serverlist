<script lang="ts">
  import { GameModes, Maps, Regions, type Server } from "$lib/types";
  import StarOutlineIcon from "$lib/icons/StarOutlineIcon.svelte";
  import ChevronDoubleUpIcon from "$lib/icons/ChevronDoubleUpIcon.svelte";
  import LockIcon from "$lib/icons/LockIcon.svelte";
  import LockOpenVariantIcon from "$lib/icons/LockOpenVariantIcon.svelte";
  import { favoriteStore } from "$lib/stores";
  import StarIcon from "$lib/icons/StarIcon.svelte";
  import ToolTip from "$lib/components/ToolTip.svelte";

  export let server: Server;

  const passwordIconSize = 25;
  const officialIconsize = 30;

  // TODO: Do a real check if the image actually exists in the file structure
  // Bug happens if the map is in Maps but the image does not exist
  $: imageName = Maps.includes(server.Map) ? server.Map.toLowerCase() : "unknown";
  $: gameMode = GameModes[server.Gamemode as keyof typeof GameModes] || "Unknown mode";
  const regionChar = Regions[server.Region as keyof typeof Regions] || "🌍";

  $: isFavorite = $favoriteStore.includes(server.Name) ? true : false;

  const isOfficialTooltip = server.IsOfficial ? "Official server" : "Community server";
  const hasPasswordTooltip = server.HasPassword ? "Password protected" : "No password";
  $: toggleFavoriteTooltip = isFavorite ? "Remove as favorite" : "Add as favorite";

  // Add or remove the server to favorite store
  function handleToggleFavorite(name: string) {
    if ($favoriteStore.includes(name)) {
      $favoriteStore = $favoriteStore.filter((s) => s !== name);
    } else {
      $favoriteStore = [...$favoriteStore, name];
    }
  }
</script>

<tr class="border-t dark:border-surface-900">
  <td class="pl-3">
    {#if !server.IsOfficial}
      <ToolTip text={toggleFavoriteTooltip} class="mt-12">
        <button
          type="button"
          class="filter-round-button dark:hover:bg-surface-500/20"
          on:click={() => handleToggleFavorite(server.Name)}
        >
          {#if isFavorite}
            <StarIcon width="25" height="25" class="dark:text-yellow-500/80" />
          {:else}
            <StarOutlineIcon width="25" height="25" class="dark:text-surface-500" />
          {/if}
        </button>
      </ToolTip>
    {/if}
  </td>
  <td class="p-3">
    <div class="flex gap-3">
      <div class="flex-none">
        <img
          class="shadow-sm"
          title={server.Map}
          alt={server.Map}
          src="images/maps/{imageName}.png"
          width="87"
          height="43"
        />
      </div>
      <div class="flex-none">
        <div class="flex flex-col -mb-1">
          <div
            class="-mt-0.5 dark:text-surface-100 font-medium"
            class:dark:text-yellow-500={isFavorite}
          >
            {server.Name}
          </div>
          <div>
            <div class="flex gap-1.5">
              <div>
                <ToolTip text={server.Region.split("_")[0]} class="mt-6">
                  {regionChar}
                </ToolTip>
              </div>
              <div class="mt-1 text-xs dark:text-surface-300 tracking-wide">
                {gameMode} • {server.Map} ({server.MapSize}) • {server.DayNight} • {server.Hz}Hz
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </td>
  <td>
    <div class="flex gap-6">
      <div>
        <ToolTip text={hasPasswordTooltip}>
          {#if server.HasPassword}
            <LockIcon
              width={passwordIconSize}
              height={passwordIconSize}
              class="dark:text-surface-200"
            />
          {:else}
            <LockOpenVariantIcon
              width={passwordIconSize}
              height={passwordIconSize}
              class="dark:text-surface-200/5"
            />
          {/if}
        </ToolTip>
      </div>
      <div>
        <ToolTip text={isOfficialTooltip}>
          {#if server.IsOfficial}
            <ChevronDoubleUpIcon
              width={officialIconsize}
              height={officialIconsize}
              class="-mt-0.5 dark:text-surface-200"
            />
          {:else}
            <ChevronDoubleUpIcon
              width={officialIconsize}
              height={officialIconsize}
              class="-mt-0.5 dark:text-surface-200/5"
            />
          {/if}
        </ToolTip>
      </div>
    </div>
  </td>
  <td>
    {server.Players} / {server.MaxPlayers}
    <span class="pl-2 dark:text-surface-400">
      {server.QueuePlayers > 0 ? "(" + server.QueuePlayers + ")" : ""}
    </span>
  </td>
</tr>
