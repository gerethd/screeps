import {WorkerTask} from "../@types/workerTask";

export class ZevrantCreepMemory implements CreepMemory {
  role: string;
  room: string;
  working: boolean;
  tasks: Array<WorkerTask>;
  constructor(role: string, room: string, working: boolean) {
    this.role = role;
    this.room = room;
    this.working = working;
    this.tasks = [];
  }

}
