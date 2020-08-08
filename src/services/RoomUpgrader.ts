// import {Runnable} from "../interfaces/Runnable";
// import {CreepConstants} from "../constants/CreepConstants";
// import {CreepUtils} from "../utils/CreepUtils";
// import {spawn} from "child_process";
//
// enum RoomUpgradeConstants {
//   WAIT_UNTIL_EMPTY = "wait",
// }
//
// export class RoomUpgrader implements Runnable{
//
//   public run(room: Room) {
//     let creeps = CreepUtils.getCreepsForRole(room.find(FIND_MY_CREEPS), CreepConstants.ROLE_ROOM_UPGRADER);
//     if(creeps === null || creeps === undefined || creeps.length == 0){
//       return;
//     }
//     const sources = room.find(FIND_SOURCES_ACTIVE);
//     let sourceCounter = 0;
//     let controller = room.controller;
//     if(controller !== null && controller !== undefined) {
//       _.forEach(creeps, creep => {
//         let sourceFound: Source;
//         _.forEach(sources, source => {
//           if (source.id == creep.memory.energySource) {
//             sourceFound = source;
//           }
//         })
//         //@ts-ignore
//         if(room.find(FIND_MY_SPAWNS)[0].store.getUsedCapacity(RESOURCE_ENERGY) <= 100 && creep.store.getFreeCapacity() != 0 && creep.harvest(sourceFound) == ERR_NOT_IN_RANGE) {
//           // @ts-ignore
//           creep.moveTo(sourceFound)
//         } else { // @ts-ignore
//           if (creep.withdraw(room.find(FIND_MY_SPAWNS)[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.store.getFreeCapacity() != 0 && !creep.memory.storage[RoomUpgradeConstants.WAIT_UNTIL_EMPTY]) {
//                     // @ts-ignore
//                     creep.moveTo(room.find(FIND_MY_SPAWNS)[0]);
//                   } else { // @ts-ignore
//                     if (creep.store.getFreeCapacity() < 50 && creep.transfer(controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                       // @ts-ignore
//                       creep.memory.storage[RoomUpgradeConstants.WAIT_UNTIL_EMPTY] = true;
//                       // @ts-ignore
//                       // @ts-ignore
//                       creep.moveTo(controller.pos);
//                     }
//                   }
//         }
//         if(creep.store.getUsedCapacity() == 0 ) {
//           // @ts-ignore
//           creep.memory.storage[RoomUpgradeConstants.WAIT_UNTIL_EMPTY] = false;
//         }
//       });
//     }
//   }
// }
