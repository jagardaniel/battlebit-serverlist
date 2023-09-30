<script lang="ts">
  import ChevronDoubleUpIcon from "$lib/icons/ChevronDoubleUpIcon.svelte";
  import LockIcon from "$lib/icons/LockIcon.svelte";
  import LockOpenVariantIcon from "$lib/icons/LockOpenVariantIcon.svelte";
  import { GameModes, Maps, Regions, type Server } from "$lib/types";
  import { TableBodyCell, TableBodyRow, Tooltip } from "flowbite-svelte";

  export let server: Server;

  // TODO: Do a real check if the image actually exists in the file structure
  // Bug happens if the map is in Maps but the image does not exist
  const imageName = Maps.includes(server.Map) ? server.Map.toLowerCase() : "unknown";
  const gameMode = GameModes[server.Gamemode as keyof typeof GameModes] || "Unknown mode";
  const regionChar = Regions[server.Region as keyof typeof Regions] || "🌍";

  const tooltipPassword = server.HasPassword ? "Password protected" : "No password";
  const tooltipOfficial = server.IsOfficial ? "Official server" : "Community server";
  const passwordIconSize = 25;
  const officialIconsize = 30;
</script>

<TableBodyRow color="custom" class="dark:border-surface-900">
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
          <div class="-mt-0.5 text-surface-100 font-normal">{server.Name}</div>
          <div>
            <div class="flex gap-1.5">
              <div>
                {regionChar}
              </div>
              <Tooltip>{server.Region.split("_")[0]}</Tooltip>
              <div class="mt-1 text-xs text-surface-300 tracking-wide font-normal">
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
          <LockIcon width={passwordIconSize} height={passwordIconSize} class="text-surface-200" />
        {:else}
          <LockOpenVariantIcon
            width={passwordIconSize}
            height={passwordIconSize}
            class="text-surface-200/5"
          />
        {/if}
        <Tooltip>{tooltipPassword}</Tooltip>
      </div>
      <div>
        {#if server.IsOfficial}
          <ChevronDoubleUpIcon
            width={officialIconsize}
            height={officialIconsize}
            class="-mt-0.5 text-surface-200"
          />
        {:else}
          <ChevronDoubleUpIcon
            width={officialIconsize}
            height={officialIconsize}
            class="-mt-0.5 text-surface-200/5"
          />
        {/if}
        <Tooltip>{tooltipOfficial}</Tooltip>
      </div>
    </div>
  </TableBodyCell>

  <TableBodyCell class="font-normal">
    <p class="text-surface-200">{server.Players} / {server.MaxPlayers}</p>
  </TableBodyCell>
</TableBodyRow>
