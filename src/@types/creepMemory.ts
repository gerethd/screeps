/**
 * defines how creep memory should be structured
 */
interface CreepMemory
{
  tasks: Array<WorkerTask>
}

interface WorkerTask {

  class: string;
  requirements: Map<string, Array<WorkerTask>>;
  outputs: Map<string, number>;
  creep: RoomObject;
  storageLocation: Structure;
  sourceLocation: RoomObject;
  priority: CreepConstants;

  gatherRequirements(): boolean;

  execute(): boolean;

  assign(creep: RoomObject): void;

  isAssigned(): boolean;
}
