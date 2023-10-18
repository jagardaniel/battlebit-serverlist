import type { ServerFilter } from "./types";
import { persisted } from "svelte-persisted-store";

export const initialStore: ServerFilter = {
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
  const { subscribe, set, update } = persisted<ServerFilter>("serverFilters", initialStore);

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
