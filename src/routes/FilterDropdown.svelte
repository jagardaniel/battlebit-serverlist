<script lang="ts">
  // https://www.w3schools.com/howto/howto_js_dropdown.asp
  // https://stackoverflow.com/questions/72896690/close-other-dropdown-on-click-in-svelte

  import { slide } from "svelte/transition";
  import type { FilterDropdownItem } from "$lib/types";
  import { filterStore } from "$lib/stores";
  import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte";

  // TODO: This can probably be more dynamic. We only want filterKey to be some of the keys
  // of the ServerFilter type. A simple string here does not work, TypeScript complains
  export let filterKey: "isOfficial" | "maps" | "regions" | "gameModes" | "maxPlayers";
  export let text: string;
  export let items: FilterDropdownItem[];

  let show = false;
  let container; //TODO: Fix TypeScript errors

  //TODO: Fix TypeScript errors
  function onWindowClick(e) {
    if (container.contains(e.target) == false) show = false;
  }

  $: buttonText =
    $filterStore[filterKey].length > 0 ? text + " (" + $filterStore[filterKey].length + ")" : text;

  $: selectedButtonClass =
    $filterStore[filterKey].length > 0 ? "dark:bg-blue-700/10 dark:hover:bg-blue-700/30" : "";
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container}>
  <div class="relative inline-block w-full">
    <!-- Dropdown button -->
    <button
      on:click={() => (show = !show)}
      type="button"
      class="w-full filter-form text-left px-4 {selectedButtonClass}"
    >
      <div class="flex justify-between">
        <div>
          {buttonText}
        </div>
        <div>
          <ChevronDownIcon width="18" height="18" class="mt-1" />
        </div>
      </div>
    </button>

    <!-- Dropdown content -->
    {#if show}
      <div id={filterKey} class="absolute shadow-md z-10 dark:bg-surface-600 p-2 mt-2 w-full">
        <ul transition:slide|global={{ delay: 0, duration: 150 }}>
          {#each items as item}
            <li>
              <label>
                <input
                  type="checkbox"
                  bind:group={$filterStore[filterKey]}
                  value={item.value}
                  class="filter-checkbox"
                />
                <span
                  class="pl-0.5 dark:hover:text-surface-300"
                  class:font-medium={$filterStore[filterKey].includes(item.value)}
                >
                  {item.label}
                </span>
              </label>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
