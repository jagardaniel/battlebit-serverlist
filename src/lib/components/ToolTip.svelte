<script lang="ts">
  // From https://play.tailwindcss.com/2eBipAu8Bt
  export let text: string = "Tooltip text";
</script>

<span class="has-tooltip">
  <span
    class="tooltip invisible absolute rounded shadow-lg px-2 p-1.5 dark:bg-surface-500 dark:border-surface-900 {$$restProps.class ||
      'mt-8'}"
  >
    {text}
  </span>

  <slot />
</span>
