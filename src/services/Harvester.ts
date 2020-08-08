// import {Runnable} from "../interfaces/Runnable";
// import {CreepUtils} from "../utils/CreepUtils";
// import {CreepConstants} from "../constants/CreepConstants";
//
// export class Harvester implements Runnable{
//
//   run(room: Room): void {
//     let creeps = CreepUtils.getCreepsForRole(room.find(FIND_MY_CREEPS), CreepConstants.ROLE_HARVESTER)
//     if(creeps === null || creeps === undefined || creeps.length == 0){
//       return;
//     }
//     const sources = room.find(FIND_SOURCES_ACTIVE);
//     let sourceCounter = 0;
//     _.forEach(creeps, creep => {
//       let spawn = room.find(FIND_MY_SPAWNS)[0];
//       let sourceFound: Source;
//       _.forEach(sources, source => {
//         if (source.id == creep.memory.energySource) {
//           sourceFound = source;
//         }
//       })
//       // @ts-ignore
//       if(creep.store.getFreeCapacity() != 0 && creep.harvest(sourceFound) == ERR_NOT_IN_RANGE) {
//         // @ts-ignore
//         creep.moveTo(sourceFound);
//       } else if (creep.store.getFreeCapacity() == 0 && creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(spawn)
//       }
//       sourceCounter = sourceCounter % sources.length + 1;
//     });
//   }
// }
