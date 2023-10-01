<script>
  import "../app.css";
  import Footer from "./Footer.svelte";
  import { DarkMode } from "flowbite-svelte";
</script>

<!-- Temporary light switch placement -->
<div class="absolute right-2 top-2 pr-2">
  <DarkMode class="focus:ring-0" />
</div>

<div class="container mx-auto my-10 max-w-7xl">
  <div
    class="bg-gray-50 dark:bg-surface-700 border border-surface-100 dark:border-surface-600 rounded-t-md shadow-md"
  >
    <slot />
  </div>
  <div>
    <Footer />
  </div>
</div>
