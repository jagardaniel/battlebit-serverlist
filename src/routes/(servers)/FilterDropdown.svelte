<script lang="ts">
  import type { DropdownItem as FilterDropdownItem } from "$lib/types";
  import { filterStore } from "$lib/store";
  import { Button, Dropdown, Checkbox } from "flowbite-svelte";
  import ChevronDownIcon from "$lib/icons/ChevronDownIcon.svelte";

  export let placeholder: string;
  // TODO: Should be a more dynamic way to do this.
  // Can't use a normal string, TypeScript complains.
  export let filterKey:
    | "isOfficial"
    | "maps"
    | "regions"
    | "gameModes"
    | "maxPlayers"
    | "hasPassword";
  export let items: FilterDropdownItem[];

  $: buttonText =
    $filterStore[filterKey].length > 0
      ? placeholder + " (" + $filterStore[filterKey].length + ")"
      : placeholder;

  $: selectedButtonClass =
    $filterStore[filterKey].length > 0
      ? "bg-surface-300/70 dark:bg-blue-700/10 dark:hover:bg-blue-700/30"
      : "";
</script>

<Button
  color="none"
  class="w-full h-10 opacity-90 text-base font-normal text-surface-500 dark:text-surface-100 bg-surface-100/60 dark:bg-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700/70 border border-surface-200 dark:border-surface-700 focus:ring-2 {selectedButtonClass}"
>
  {buttonText}
  <ChevronDownIcon width="16" height="16" class="ml-2" />
</Button>
<Dropdown class="w-48 p-2 bg-surface-50/50 dark:bg-surface-600">
  {#each items as item}
    <li>
      <Checkbox
        class="text-base font-normal"
        value={item.value}
        bind:group={$filterStore[filterKey]}
      >
        <p
          class="hover:text-surface-400 dark:hover:text-surface-300"
          class:font-medium={$filterStore[filterKey].includes(item.value)}
        >
          {item.label}
        </p>
      </Checkbox>
    </li>
  {/each}
</Dropdown>
