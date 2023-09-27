// From https://joyofcode.xyz/svelte-context-with-stores
import { getContext, setContext } from "svelte";
import type { Writable } from "svelte/store";
import type { ServerFilters } from "./types";
import { persisted } from "svelte-local-storage-store";

const initialFilters = {
  name: "",
  gameModes: [],
  maps: [],
  regions: [],
  isOfficial: [],
  maxPlayers: [],
  hasPassword: [],
};

export function setFilterContext() {
  const store = persisted<ServerFilters>("serverFilters", initialFilters);
  setContext("filterStore", store);
}

export function getFilterContext() {
  return getContext<Writable<ServerFilters>>("filterStore");
}
