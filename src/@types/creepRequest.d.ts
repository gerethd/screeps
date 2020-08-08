interface CreepRequest
{
  //What kind of creep do we want?
  minimumTier?:    number,              //if set, the creep must have at least this tier to satisfy the request
  preferredTier?:  number,              //if set, the request will spawn a creep of at least this tier if possible, even if it has to spawn it from further away

  //Where do we want it?

  /**
   * request will heavily favor spawns that are near this position
   * and disallow spawns that are too far away
   * if the creep is spawned from a different room, then the new creep will be assigned a goal to move into this room
   * (unless overridden by requestedForGoal)
   */
  requestPos: RoomPosition,
  spawnFromRoom?: string, //if set, then the request can only be satisfied by spawns in the specified room

  //how badly do we want it?
  creepName?: string,       //creep associated with the request.  Gets set when spawning begins, not when it completes
  spawnName?: string,       //spawn associated with the request.  Gets set when spawning begins, not when it completes

  //whether or not the new creep should be set as specialized
  specialized: boolean,

}
