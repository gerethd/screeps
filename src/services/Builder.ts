// import {Runnable} from "../interfaces/Runnable";
// import {CreepConstants} from "../constants/CreepConstants";
// import {CreepUtils} from "../utils/CreepUtils";
//
// export enum BuilderConstants {
//   constructionSite = "site"
// }
//
// export class Builder implements Runnable {
//
//   run(room: Room): void {
//     let spawner = room.find(FIND_MY_SPAWNS)[0];
//     let constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
//     if(constructionSites.length > 0) {
//       let creeps = CreepUtils.getCreepsForRole(room.find(FIND_MY_CREEPS), CreepConstants.ROLE_BUILDER)
//       _.forEach(creeps, creep => {
//         if(creep.withdraw(spawner, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(spawner);
//         } else if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE){
//           // @ts-ignore
//           creep.moveTo(creep.memory.storage[BuilderConstants.constructionSite])
//         }
//       })
//     }
//
//   }
//
//
// }
