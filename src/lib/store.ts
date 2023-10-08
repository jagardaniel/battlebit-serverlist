import type { ServerFilters } from "./types";
import { persisted } from "svelte-local-storage-store";

export const initialStore: ServerFilters = {
  name: "",
  gameModes: [],
  maps: [],
  regions: [],
  isOfficial: [],
  maxPlayers: [],
  showPassword: true,
  showEmpty: true,
};

function createStore() {
  const { subscribe, set, update } = persisted<ServerFilters>("serverFilters", initialStore);

  return {
    subscribe,
    set,
    update,
    // TODO: Does not reset (the second time) if I use initialStore here instead of
    // manually "clearing" all values here. Probably something basic, not sure why.
    reset: () =>
      set({
        name: "",
        gameModes: [],
        maps: [],
        regions: [],
        isOfficial: [],
        maxPlayers: [],
        showPassword: true,
        showEmpty: true,
      }),
  };
}

export const filterStore = createStore();
