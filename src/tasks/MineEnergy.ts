import {WorkerTask} from "../@types/workerTask";
import {CreepConstants} from "../constants/CreepConstants";

export class MineEnergy implements WorkerTask {

  class: string;
  outputs: Map<string, number>;
  requirements: Map<string, Array<WorkerTask>>;
  // @ts-ignore
  creep: Creep;
  // @ts-ignore
  private _sourceLocation: RoomObject;
  // @ts-ignore
  private _storageLocation: Structure;
  private resourcesGathered = false;
  priority: CreepConstants = CreepConstants.PRIORITY_HIGH;


  constructor() {
    this.class = "MineEnergy"
    this.outputs = new Map<string, number>();
    this.outputs.set(RESOURCE_ENERGY, 50);
    this.requirements = new Map();
  }

  execute(): boolean {
    if(this.creep.store.getFreeCapacity() != 0 && this.creep.harvest(<Source> this._sourceLocation) == ERR_NOT_IN_RANGE && !this.resourcesGathered) {
      // @ts-ignore
      creep.moveTo(this._sourceLocation);
    }
    let response = this.creep.transfer(this._storageLocation, RESOURCE_ENERGY);

    switch (response) {
      case ERR_NOT_IN_RANGE:
        this.creep.moveTo(this._storageLocation);
        break;
      case OK: {
        return true;
      }
    }
    return false;
  }

  gatherRequirements(): boolean {
    return false;
  }

  assign(creep: Creep): void {
    this.creep = creep;
  }


  get sourceLocation(): RoomObject {
    return this._sourceLocation;
  }

  set sourceLocation(value: RoomObject) {
    this._sourceLocation = value;
  }

  get storageLocation(): Structure {
    return this._storageLocation;
  }

  set storageLocation(value: Structure) {
    this._storageLocation = value;
  }

  isAssigned(): boolean {
    return this.creep === undefined;
  }

}
