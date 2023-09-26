<script lang="ts">
  import type { DropdownItem as FilterDropdownItem } from "$lib/types";
  import { getFilterContext } from "$lib/FilterContext";
  import { Button, Dropdown, Checkbox } from "flowbite-svelte";
  import { ChevronDownSolid } from "flowbite-svelte-icons";

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

  const context = getFilterContext();

  $: buttonText =
    $context[filterKey].length > 0
      ? placeholder + " (" + $context[filterKey].length + ")"
      : placeholder;

  $: selectedButtonClass =
    $context[filterKey].length > 0 ? "bg-blue-700/10 hover:bg-blue-700/30" : "";
</script>

<Button
  color="none"
  class="w-full h-10 opacity-90 text-base font-normal text-surface-100 bg-surface-600 hover:bg-surface-700/70 border border-surface-700 focus:ring-2 {selectedButtonClass}"
>
  {buttonText}
  <ChevronDownSolid class="w-2 h-2 ml-2" />
</Button>
<Dropdown class="w-48 p-2 bg-surface-600">
  {#each items as item}
    <li>
      <Checkbox class="text-base font-normal" value={item.value} bind:group={$context[filterKey]}>
        <p
          class="hover:text-surface-300"
          class:text-white={$context[filterKey].includes(item.value)}
        >
          {item.label}
        </p>
      </Checkbox>
    </li>
  {/each}
</Dropdown>
