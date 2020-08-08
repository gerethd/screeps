interface GlobalSettings
{
  //which kinds of high level automation to perform
  autoConstruct: boolean,
  autoRoomSettings: boolean,
  autoHarvestFlags: boolean,
  autoAdjustSpawnCounts: boolean,
  handleOldSellOrders: boolean,

  //number of ticks to keep track of statistics figures for.  once this is reached, old entries are pushed out to make room for new ones
  //this impacts both memory and performance if set too high
  statisticsTrackingHistoryLength: number,

  //how often to adjust spawn counts
  spawnCountAdjustmentInterval: number,

  //terminals will try to have EXACTLY this much energy at all times, to be used for purchases.  Any excess is carried away.
  desiredTerminalEnergyBalance: number,

  //log settings to use on new rooms, or when flag order DEBUG_RESET_LOGGING is run.
  //number of ticks to reuse any given path before calculating it again
  //lower values produce better movement, but have a severe performance impact
  moveToReusePathTicks: number,

  oldOrderThreshold: number,
}

interface RoomSettingsForConstruction
{
  forceTheseSettings: boolean, //if true, high level automation will never update these
  spawnExtensions: boolean,
  roadsBySpawnsAndExtensions: boolean,
  roadsByTowers: boolean,
  containersBySources: boolean,
  containersByExtractors: boolean,
  towers: boolean,
  extractors: boolean,
  storage: boolean,
}

interface RoomSettingsForRepairs
{
  maxDefenseHealth: number,   //walls wont be repaired above this many hits
  wallRepairThreshold: number //if set, storage must contain at least this much energy for walls to be repaired
}
