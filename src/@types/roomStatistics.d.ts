interface RoomStatistics
{
  unspecializedIdleCreepTicks: number[],  //number of unspecialized creeps that were idle in the past x ticks
  unspecializedIdleCreepTicksSum: number, //sum of all entries in the previous array

  unspecializedCreepTicks: number[],     //number of unspecialized creeps in the past x ticks
  unspecializedCreepTicksSum: number,    //sum of all entries in the previous array

  upgradesTicks: number[],               //number of upgrade calls in the past x ticks
  upgradesTicksSum: number,              //sum of all entries in the previous array
  upgradesThisTick: number,              //number of upgrade calls THIS tick

  energyPerContainerTicks: number[],     //average energy per container per tick in the past x ticks
  energyPerContainerTicksSum: number,    //sum of all entries in the previous array
}

interface RoomStatisticsAverages
{
  complete: boolean, //whether or not the information is "complete" (in other words, this is false if we have less info than the tracking history length)

  averages:
    {
      creeps: number, //average number of creeps per tick
      idle: number, //average number of idle creeps per tick
      upgrades: number, //average number of upgrade operations per tick
      energyPerContainer: number, //average energy per container per tick
    },

  roundedAverages:
    {
      creeps: number, //rounded average number of creeps per tick
      idle: number, //rounded average number of idle creeps per tick
      upgrades: number, //rounded average number of upgrade operations per tick
      energyPerContainer: number, //rounded average energy per container per tick
    }
}
