import {CreepConstants} from "../constants/CreepConstants";

export interface WorkerTask {

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
