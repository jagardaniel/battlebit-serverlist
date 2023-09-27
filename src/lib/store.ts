import type { ServerFilters } from "./types";
import { persisted } from "svelte-local-storage-store";

const initialFilters: ServerFilters = {
  name: "",
  gameModes: [],
  maps: [],
  regions: [],
  isOfficial: [],
  maxPlayers: [],
  hasPassword: [],
};

export const filterStore = persisted<ServerFilters>("serverFilters", initialFilters);
