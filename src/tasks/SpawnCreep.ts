import {WorkerTask} from "../@types/workerTask";
import {RandomNameGenerator} from "../utils/RandomNameGenerator";
import {CreepConstants} from "../constants/CreepConstants";
import {ZevrantCreepMemory} from "../pojo/ZevrantCreepMemory";

export class SpawnCreep implements WorkerTask {
  class: string;
  // @ts-ignore
  creep: StructureSpawn;
  outputs: Map<string, number>;
  requirements: Map<string, Array<WorkerTask>>;
  priority: CreepConstants = CreepConstants.PRIORITY_HIGHEST;
  // @ts-ignore
  private _sourceLocation: RoomObject;
  // @ts-ignore
  private _storageLocation: Structure;

  constructor() {
    this.class = "SpawnCreep"
    this.outputs = new Map();
    this.requirements = new Map();
    // @ts-ignore
    this.outputs.set(FIND_MY_CREEPS, 1);
    // @ts-ignore
    this.requirements.set(RESOURCE_ENERGY, 300);
  }

  assign(creep: StructureSpawn): void {
    this.creep = creep;
  }

  execute(): boolean {
    let room =  this._sourceLocation.room;
    if(room === undefined) {
      return false;
    }
    let memory: ZevrantCreepMemory = new ZevrantCreepMemory("", room.name, true)
    return this.creep.spawnCreep([MOVE, MOVE, MOVE, CARRY, WORK], RandomNameGenerator.generate(), {memory: memory}) == 0;
  }

  gatherRequirements(): boolean {
    return false;
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
