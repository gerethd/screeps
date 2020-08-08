import {WorkerTask} from "../@types/workerTask";
import {MineEnergy} from "./MineEnergy";

export class ControllerUpgrade implements WorkerTask {
  class: string;
  // @ts-ignore
  creep: RoomObject;
  outputs: Map<string, number>;
  requirements: Map<string, Array<WorkerTask>>;
  // @ts-ignore
  sourceLocation: RoomObject;
  // @ts-ignore
  storageLocation: Structure;
  priority: CreepConstants = CreepConstants.PRIORITY_MEDIUM;

  constructor() {
    this.class = "UpgradeController"
    this.outputs = new Map<string, number>();
    // @ts-ignore
    this.outputs["controllerUpgradeProgress"] = 50;
    this.requirements = new Map();
    // @ts-ignore
    this.requirements[RESOURCE_ENERGY] = new MineEnergy();
  }

  assign(creep: RoomObject): void {
  }

  execute(): boolean {
    return false;
  }

  gatherRequirements(): boolean {
    return false;
  }

  isAssigned(): boolean {
    return this.creep === undefined;
  }


}
