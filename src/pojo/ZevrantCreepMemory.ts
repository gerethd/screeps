export class ZevrantCreepMemory implements CreepMemory {
  tasks: Array<WorkerTask>;

  constructor() {
    this.tasks = [];
  }

}
