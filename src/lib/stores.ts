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

function createFilterStore() {
  const { subscribe, set, update } = persisted<ServerFilters>("serverFilters", initialStore);

  return {
    subscribe,
    set,
    update,
    // TODO: Does not reset (the second time) if I use initialStore here instead of
    // manually "clearing" all values like below. Probably something basic, not sure why.
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

export const filterStore = createFilterStore();

function createFavoriteStore() {
  const { subscribe, set, update } = persisted<string[]>("serverFavorites", []);

  return {
    subscribe,
    set,
    update,
    reset: () => set([]),
  };
}

export const favoriteStore = createFavoriteStore();
