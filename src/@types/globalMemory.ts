interface Memory
{
  globalSettings: GlobalSettings,
  globalAutomationMemory?: GlobalAutomationMemory,
  creeps: { [index: string]: CreepMemory },
  flags: { [index: string]: FlagMemory },
  rooms: { [index: string]: RoomMemory },
  spawns: { [index: string]: SpawnMemory },
}

interface SpawnMemory {
  tasks: Array<WorkerTask>
}

interface GlobalAutomationMemory
{
  handleOldOrders?: { orderId: string, lastAdjustedTime: number }[]
}
