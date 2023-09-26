<script>
  import "../app.css";
  import Footer from "./Footer.svelte";
</script>

<div class="container mx-auto my-10 max-w-7xl">
  <div class="bg-surface-700 border border-surface-600 rounded-md shadow-md">
    <slot />
  </div>
  <div>
    <Footer />
  </div>
</div>
