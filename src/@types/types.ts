// example declaration file - remove these and add your own custom typings

// memory extension samples
import {WorkerTask} from "./workerTask";
import {ZevrantCreepMemory} from "../pojo/ZevrantCreepMemory";

interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
  tasks: Array<WorkerTask>;
}

interface Memory {
  uuid: number;
  log: any;
  creeps: { [index: string]: ZevrantCreepMemory };
  flags: { [index: string]: FlagMemory };
  rooms: { [index: string]: RoomMemory };
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}
