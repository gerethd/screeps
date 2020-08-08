import {ErrorMapper} from "utils/ErrorMapper";
import {TaskTree} from "./dataStructures/TaskTree";
import {SpawnCreep} from "./tasks/SpawnCreep";
import {WorkerTask} from "./@types/workerTask";
import {MineEnergy} from "./tasks/MineEnergy";
import {ControllerUpgrade} from "./tasks/ControllerUpgrade";


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const taskTemplates: Array<WorkerTask> = [];
taskTemplates.push(new MineEnergy());
taskTemplates.push(new SpawnCreep())
taskTemplates.push(new ControllerUpgrade());

const taskTrees: Array<TaskTree> = [];
const roomTasksMap: Map<string, Array<TaskTree>> = new Map();
const maxRoomCreeps = 10;
let roomCreepStorage: Map<string, Map<string, Creep>> = new Map<string, Map<string, Creep>>();

export const loop = ErrorMapper.wrapLoop(() => {

  console.log("here")
  _.forEach(Game.rooms, room => {
    if(roomTasksMap.get(room.name) == undefined) {
      roomTasksMap.set(room.name, []);
    }

    let creepStorage: Map<string, Creep>;

    if(roomCreepStorage.get(room.name) === undefined) {
      creepStorage = new Map<string, Creep>()
      roomCreepStorage.set(room.name, creepStorage);
    } else {
      // @ts-ignore
      creepStorage = roomCreepStorage.get(room.name);
    }

    console.log(getSpawnRequests() <= room.find(FIND_MY_SPAWNS).length)
    if(room.find(FIND_MY_CREEPS).length < maxRoomCreeps && getSpawnRequests() <= room.find(FIND_MY_SPAWNS).length) {
      console.log("here")
      let spawnTask = new SpawnCreep();
      let spawners = room.find(FIND_MY_SPAWNS);
      let spawner = spawners[Math.floor(Math.random() * spawners.length)];
      spawnTask.sourceLocation = spawner;
      spawnTask.storageLocation = spawner;
      spawnTask.assign(spawner);
      let task: TaskTree = new TaskTree(spawnTask);
      // @ts-ignore
      roomTasksMap.get(room.name).push(task);
      buildDependents(spawnTask, task, room);
      spawnTask.execute();
    }

    let ids = verifyCreeps(room, creepStorage);
    let unassignedTasks: Array<WorkerTask> = getUnassignedTasks(roomTasksMap.get(room.name));
    _.forEach(unassignedTasks, task => {
      assignCreep(ids, task, creepStorage)
    })
    let creeps = creepStorage.keys();
    let creep = creeps.next();
    while(!creep.done) {
      executeHighestPriority(creepStorage.get(creep.value));
    }

  });

});

function getSpawnRequests(): number {
  let count = 0;

  _.forEach(taskTrees, task => {
    if(task.value.class == new SpawnCreep().class) {
      count++;
    }
  })
  return count;
}

function buildDependents(task: WorkerTask, parentTask: TaskTree, room: Room) {
  let keys = task.requirements.keys();
  let key = keys.next();
  let first = true;
  while(!key.done) {
    // @ts-ignore
    let newTask;
    _.forEach(taskTemplates, taskTemplate => {
      let outputs = taskTemplate.outputs.keys();
      let output = outputs.next()
      while(!output.done) {
        if (output.value == key.value) {
          switch (taskTemplate.class) {
            case "MineEnergy": {
              newTask = new MineEnergy();
              let energySources = room.find(FIND_SOURCES_ACTIVE);
              let spawnerSources = room.find(FIND_MY_SPAWNS);
              newTask.sourceLocation = energySources[Math.floor(Math.random() * energySources.length)];
              newTask.storageLocation = spawnerSources[Math.floor(Math.random() * spawnerSources.length)];
              break;
            }
            case "UpgradeController": {
              newTask = new ControllerUpgrade();
              let spawnerSources = room.find(FIND_MY_SPAWNS);
              newTask.sourceLocation = spawnerSources[Math.floor(Math.random() * spawnerSources.length)];
              // @ts-ignore
              newTask.storageLocation = room.controller;
              break;
            }
            case "SpawnCreep": {
              newTask = new SpawnCreep();
              let spawnerSources = room.find(FIND_MY_SPAWNS);
              newTask.sourceLocation = spawnerSources[Math.floor(Math.random() * spawnerSources.length)];
              newTask.storageLocation = <StructureSpawn>newTask.sourceLocation;
            }
          }
          // @ts-ignore
          buildDependents(newTask, parentTask.addChild(newTask), room);
        }
        output = outputs.next();
      }
    })
    key = keys.next();
  }
}

function verifyCreeps(room: Room, creepStorage: Map<string, Creep>): Array<string> {
  let creeps = room.find(FIND_MY_CREEPS);
  let ids: string[] = [];
  let tempIds: string[] = [];
  if(creepStorage === undefined) {
    _.forEach(creeps, creep => {
      // @ts-ignore
      creepStorage.set(creep.id, creep);
    });
  }
  let creepKeys = creepStorage.keys();
  let id = creepKeys.next();
  while(!id.done) {
    ids.push(id.value)
    tempIds.push(id.value)
    id = creepKeys.next();
  }
  let newCreeps: Array<Creep> = [];
  _.forEach(creeps, creep => {
    let index = tempIds.indexOf(creep.id);
    if(index < 0) {
      creepStorage.set(creep.id, creep);
      ids.push(creep.id);
    } else {
      tempIds.splice(index, 1);
    }
  })

  _.forEach(tempIds, id => {
    reassignTasks(ids, id, creepStorage);
  });
  return ids;
}

function reassignTasks(ids: string[], id: string, creepStorage: Map<string, Creep>) {
  let creep = creepStorage.get(id);
  creepStorage.delete(id);
  if(creep === undefined) {
    return;
  }
  ids.splice(ids.indexOf(id), 1);
  // @ts-ignore
  let tasks: Array<WorkerTask> = creep.memory.tasks;
  let index = 0;
  while (tasks.length > 0){
    assignCreep(ids, tasks.pop(), creepStorage);
  }

}

function assignCreep(ids: string[], workerTask: WorkerTask | undefined, creepStorage: Map<string, Creep>) {
  if(workerTask === undefined) {
    return;
  }
  let taskCount: number;
  let minId: string = "";
  _.forEach(ids, id => {
    if(taskCount == undefined) {
      let creep = creepStorage.get(id);
      if(creep !== undefined) {
        minId = creep.id;
        // @ts-ignore
        taskCount = creep.memory.tasks.length
      }
    } else {
      let creep = creepStorage.get(id);
      // @ts-ignore
      if( creep !== undefined && creep.memory.tasks.length < taskCount) {
        // @ts-ignore
        taskCount = creep.memory.tasks.length;
        minId = creep.id;
      }
    }
  });
  let creep = creepStorage.get(minId);
  if(creep !== undefined) {
    // @ts-ignore
    creep.memory.tasks.push(workerTask);
    workerTask.assign(creep);
  }
}

function getUnassignedTasks(tasks: Array<TaskTree> | undefined): Array<WorkerTask> {
  if(tasks === undefined) {
    return [];
  }
  let unassignedTasks: Array<WorkerTask> = [];
  _.forEach(tasks, taskTree => {
    isAssignedRecursively(taskTree, unassignedTasks)
  });
  return unassignedTasks;
}

function isAssignedRecursively(taskTree: TaskTree, unassignedTasks: Array<WorkerTask>) {
  if(taskTree.children.length > 0) {
    _.forEach(taskTree.children, child => {
      isAssignedRecursively(child, unassignedTasks);
    })
  }
  if(!taskTree.value.isAssigned()) {
    unassignedTasks.push(taskTree.value);
  }
}

function executeHighestPriority(creep: Creep | undefined) {
  if(creep === undefined) {
    return;
  }

  let highest = 0;

  for(let i = 1; i < creep.memory.tasks.length; i++) {
    if(creep.memory.tasks[i] > creep.memory.tasks[highest]) {
      highest = i;
    }
  }

  creep.memory.tasks[highest].execute()
}
