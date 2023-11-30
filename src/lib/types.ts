export type Server = {
  Name: string;
  Map: string;
  MapSize: string;
  Gamemode: string;
  Region: string;
  Players: number;
  QueuePlayers: number;
  MaxPlayers: number;
  Hz: number;
  DayNight: string;
  IsOfficial: boolean;
  HasPassword: boolean;
  AntiCheat: string;
  Build: string;
};

export interface ServerFilter {
  name: string;
  gameModes: string[];
  maps: string[];
  regions: string[];
  isOfficial: string[];
  maxPlayers: string[];
  showPassword: boolean;
  showEmpty: boolean;
}

export type FilterDropdownItem = {
  label: string;
  value: string;
};

// TODO: consts below should probably be in a different file
export const GameModes = {
  CaptureTheFlag: "Capture The Flag",
  CONQ: "Conquest",
  DOMI: "Domination",
  ELI: "Elimination",
  FFA: "Free For All",
  FRONTLINE: "Frontlines",
  GunGameFFA: "Gun Game FFA",
  INFCONQ: "Infantry Conquest",
  RUSH: "Rush",
  TDM: "Team Deathmatch",
  VoxelFortify: "Voxel Fortify",
  VoxelTrench: "Voxel Trench",
  // Invasion is currently called 19 in the public API
  19: "Invasion",
};

export const Maps = [
  "Azagor",
  "Basra",
  "Construction",
  "District",
  "Dustydew",
  "Eduardovo",
  "Frugis",
  "Isle",
  "Kodiak",
  "Lonovo",
  "MultuIslands",
  "Namak",
  "OilDunes",
  "Outskirts",
  "River",
  "Salhan",
  "SandySunset",
  "TensaTown",
  "Valley",
  "VoxelLand",
  "Wakistan",
  "WineParadise",
  "ZalfiBay",
  "Old_District",
  "Old_Eduardovo",
  "Old_MultuIslands",
  "Old_Namak",
  "Old_OilDunes",
  "Old_WineParadise",
  "Old_Wakistan",
  "Old_SandySunset",
];

export const Regions = {
  America_Central: "🇺🇸",
  Asia_Central: "🌏",
  Australia_Central: "🇦🇺",
  Brazil_Central: "🇧🇷",
  Europe_Central: "🇪🇺",
  Japan_Central: "🇯🇵",
};
