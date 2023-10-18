<script>
  import "../app.css";
  import GithubIcon from "$lib/icons/GithubIcon.svelte";
</script>

<svelte:head>
  <title>BattleBit - Server List</title>
</svelte:head>

<div class="container mx-auto my-10 max-w-7xl">
  <div class="dark:bg-surface-700 border border-b-0 dark:border-surface-600 rounded-t-md shadow-md">
    <slot />
  </div>
  <div class="px-2 pt-2">
    <div class="flex justify-between">
      <div>
        <p class="text-xs tracking-wide dark:text-surface-400">
          This site is not affiliated with BattleBit Remastered/SgtOkiDoki
        </p>
      </div>
      <div class="hover:dark:text-gray-600">
        <a href="https://github.com/jagardaniel/battlebit-serverlist" target="_blank">
          <GithubIcon width="25" height="25" />
        </a>
      </div>
    </div>
  </div>
</div>
