<script>
  import { PaginationNav } from "svelte-paginate";
</script>

<div class="dark-pagination-nav -mb-0.5">
  <PaginationNav {...$$props} on:setPage />
</div>

<style>
  .dark-pagination-nav :global(.pagination-nav) {
    display: flex;
    justify-content: center;
    background: #283751;
    border-top: 1px solid #141b28;
  }
  .dark-pagination-nav :global(.option) {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s all ease-out;
    user-select: none;
    color: #a9afb9;
  }
  .dark-pagination-nav :global(.option svg path) {
    fill: #a9afb9;
  }

  .dark-pagination-nav :global(.option.number),
  .dark-pagination-nav :global(.option.ellipsis) {
    padding: 10px 15px;
  }
  .dark-pagination-nav :global(.option:hover) {
    background: #1e293d;
    cursor: pointer;
  }
  .dark-pagination-nav :global(.option.active) {
    color: #fff;
    background: #1e293d;
  }
</style>
