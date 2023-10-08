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

export interface ServerFilters {
  name: string;
  gameModes: string[];
  maps: string[];
  regions: string[];
  isOfficial: string[];
  maxPlayers: string[];
  hasPassword: string[];
  showEmpty: boolean;
}

export type DropdownItem = {
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
  "Lonovo",
  "MultuIslands",
  "Namak",
  "OilDunes",
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
  // Available in the game since the last patch but no picture for them yet
  // "Old_SandySunset",
];

export const Regions = {
  America_Central: "🇺🇸",
  Asia_Central: "🌏",
  Australia_Central: "🇦🇺",
  Brazil_Central: "🇧🇷",
  Europe_Central: "🇪🇺",
  Japan_Central: "🇯🇵",
};
