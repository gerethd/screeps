/**
 * defines how creep memory should be structured
 */
interface CreepMemory
{

  //if true, this creep is specialized for a specific purpose
  //specialized creeps will be ignored when determining whether a room needs more units
  //and will not take part in general goal assignment
  //typically, such creeps are being controlled by a Role
  specialized: boolean,

  //if this creep is being controlled by a role, it will populate both of these
  //they are primarily used for logging
  roleName?: string,

  spawnedFromRoom: string,   //name of the room that spawned this creep
  restrictedToRoom?: string, //if set, the creep will only accept goals from the specified room

  idleSince?: number,      //first tick this creep became idle

  isWillingToShareEnergy?: boolean, //if true, this creep is willing to share its energy with other creeps

  tasks: Array<WorkerTask>
}
