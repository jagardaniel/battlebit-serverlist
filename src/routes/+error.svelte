<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="p-4">
  <p class="mb-1 text-2xl">Something went wrong!</p>
  <p class="text-sm">{$page.error?.message} ({$page.status})</p>
</div>
